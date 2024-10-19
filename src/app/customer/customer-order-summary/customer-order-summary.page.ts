import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomerAddressListPage } from 'src/app/customer/customer-address-list/customer-address-list.page';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-customer-order-summary',
  templateUrl: './customer-order-summary.page.html',
  styleUrls: ['./customer-order-summary.page.scss'],
})
export class CustomerOrderSummaryPage implements OnInit {
  _id: any = '';
  orderData: any;
  selectedAddress: any;
  addressList: any = [];
  constructor(
    private router: Router,
    private model: ModalController,
    private alert: AlertController,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }
  async ngAfterViewInit() {
    const loading = await this.adminService.presentLoading();
    this._id = this.router.url.split('/')[2];
    this.adminService.getCustomerAddress({}).subscribe((res: any) => {
      this.addressList = res.data || [];
      this.selectedAddress = this.addressList?.find((e: any) => e.default);
      loading.dismiss()
    }, (err) => {
      loading.dismiss()
      this.addressList = []
    })
    this.adminService.getCustomerOrderSummary({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orderData = res.data;
        this.orderData.gst = Math.round((5 / 100) * this.orderData?.finalCostWithOutDeliveryOption);
      } else {
        this.orderData = false;
      }
      loading.dismiss()
    }, (err) => {
      loading.dismiss()
      this.orderData = false;
      this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
    })
  }

  parsePrice(priceString: string | undefined): number {
    return parseFloat(priceString || '0');
  }

  async openAddressList() {
    const modal = await this.model.create({ component: CustomerAddressListPage });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (data && data._id) this.selectedAddress = data;
  }


  goBack() {
    this.adminService.deleteTempOrder({ _id: this._id }).subscribe((res: any) => {
      if (this.orderData.refListingId) {
        this.router.navigateByUrl('/customerListings/' + this.orderData.refListingId);
      } else {
        this.router.navigate(['/customerListings']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  async placeOrder() {
    if (!this.selectedAddress?._id) {
      console.log('address not found')
    }
    else {
      const loading = await this.adminService.presentLoading();
      try {
        let amount = this.orderData?.finalCostWithOutDeliveryOption + (this.orderData?.deliveryOption?.price || 0) + this.orderData?.gst || 0
        // let amount = 1
        this.adminService.createOrderInRazorPay({ _id: this.orderData._id, amount: amount * 100, receipt: 'order_rcptid_11', currency: "INR" }).subscribe((details: any) => {
          let razorPayOrderDetails = details.order || {}
          if (details.success && razorPayOrderDetails.id) {
            this.adminService.payWithRazorpay(razorPayOrderDetails.id, amount, this.orderData._id).then(paymentDetails => {
              if (paymentDetails) {
                this.adminService.placeOrder({ _id: this._id, paymentDetails: paymentDetails, deliveryAddress: { ...this.selectedAddress, commision: this.orderData?.makerData?.commission || 0 } }).subscribe((res: any) => {
                  loading.dismiss()
                  if (res.success) this.router.navigate(['/orders']);
                }, (err: any) => {
                  if (err.status == 410) {
                    loading.dismiss()
                    this.openAlert('OUT OF STOCK',
                      "We're sorry, but some items in your order are currently out of stock. We're working to restock our inventory soon. Please remove the out-of-stock items or adjust the quantities, or contact our support team for further assistance. Thank you for your understanding.",
                      ['close']);
                  } else {
                    loading.dismiss()
                    this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
                  }
                })
              } else {
                loading.dismiss();
                this.adminService.savePaymentFailedDetails({ tempOrderId: this.orderData._id, razorPayOrderDetails: razorPayOrderDetails, ...paymentDetails }).subscribe(resp => { console.log(resp) }, (err => { console.log(err) }))
                // this.openAlert('ERROR', `${err.message}`, ['close']);
              }
            }).catch(err => {
              loading.dismiss();
              this.adminService.savePaymentFailedDetails({ tempOrderId: this.orderData._id, razorPayOrderDetails: razorPayOrderDetails, ...err }).subscribe(resp => { console.log(resp) }, (err => { console.log(err) }))
              this.openAlert('ERROR', `${err.message}`, ['close']);
            })
          } else {
            loading.dismiss();
            this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
          }
        }, (err => {
          loading.dismiss();
          this.openAlert('ERROR', `${err.message}`, ['close']);
        }));

      } catch (err) {
        loading.dismiss();
        console.log('Error creating order', err);
      }

    }
  }

  async openAlert(header: any, message: any, buttons: any) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: buttons,
      mode: 'ios',
    });

    await alert.present();
  }

  getSanitizedLocationUrl(): SafeHtml {
    let locationUrl = this.selectedAddress?.LocationUrl || '';
    if (this.orderData.deliveryOption?.type != "Pickup Available") {
      locationUrl = this.selectedAddress?.LocationUrl;
    } else {
      locationUrl = this.orderData?.listingData?.address;
    }
    if (!locationUrl && this.orderData && this.orderData.deliveryAddress) {
      locationUrl = this.orderData.deliveryAddress.LocationUrl || '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(locationUrl.replace(/,/g, ',<br>'));
  }
  async copyLocationUrl() {
    let locationUrl = this.selectedAddress?.LocationUrl;
    if (this.orderData.deliveryOption?.type != "Pickup Available") {
      locationUrl = this.selectedAddress?.LocationUrl;
    } else {
      locationUrl = this.orderData?.listingData?.address;
    }
    if (locationUrl) {
      const tempInput = document.createElement('input');
      tempInput.value = locationUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      const alert = await this.alertController.create({
        header: 'Copied!',
        message: 'Location URL copied successfully',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  redirectToGoogleMaps() {
    if (this.orderData.deliveryOption?.type != "Pickup Available" && this.selectedAddress?.LocationUrl) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.selectedAddress?.LocationUrl)}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.orderData?.listingData?.address)}`, '_blank');
    }
  }

}
