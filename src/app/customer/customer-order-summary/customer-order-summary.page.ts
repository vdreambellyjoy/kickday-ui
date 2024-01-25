import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-order-summary',
  templateUrl: './customer-order-summary.page.html',
  styleUrls: ['./customer-order-summary.page.scss'],
})
export class CustomerOrderSummaryPage implements OnInit {
  _id: any = '';
  orderData: any;
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
  ngAfterViewInit() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getCustomerOrderSummary({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orderData = res.data;
      } else {
        this.orderData = false;
      }
    }, (err) => {
      this.orderData = false;
      this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
    })
  }


  goBack() {
    if (this.orderData.refListingId) {
      this.router.navigateByUrl('/customerListings/' + this.orderData.refListingId);
    } else {
      this.router.navigate(['/customerListings']);
    }
  }

  placeOrder() {
    this.adminService.placeOrder({ _id: this._id }).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/orders']);
      }
    }, (err: any) => {
      if (err.status == 410) {
        this.openAlert('OUT OF STOCK',
          "We're sorry, but some items in your order are currently out of stock. We're working to restock our inventory soon. Please remove the out-of-stock items or adjust the quantities, or contact our support team for further assistance. Thank you for your understanding.",
          ['close']);
      } else {
        this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
      }
    })
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
    const locationUrl = this.orderData.deliveryAddress?.LocationUrl || '';
    return this.sanitizer.bypassSecurityTrustHtml(locationUrl.replace(/,/g, ',<br>'));
  }

  async copyLocationUrl() {
    const locationUrl = this.orderData.deliveryAddress?.LocationUrl;
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
    if (this.orderData.deliveryAddress?.LocationUrl) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.orderData.deliveryAddress.LocationUrl)}`, '_blank');
    }
  }

}
