import { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { AdminService } from 'src/app/services/admin.service';
import { CustomerAddressListPage } from 'src/app/customer/customer-address-list/customer-address-list.page';
@Component({
  selector: 'app-customer-listing-overview',
  templateUrl: './customer-listing-overview.page.html',
  styleUrls: ['./customer-listing-overview.page.scss'],
})
export class CustomerListingOverviewPage {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  _id: any = '';
  listingData: any = {};
  totalCost: number = 0;
  selectedDeliveryType: any;
  selectedAddress: any;
  note: any = '';

  public alertButtons = [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'YES',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.router.navigate(['/customerListings']);
      },
    },
  ];

  constructor(
    private router: Router,
    private model: ModalController,
    private alert: AlertController,
    private adminService: AdminService,
  ) {
    this.selectedDeliveryType = null;
  }

  ngOnInIt() {

  }

  ngAfterViewInit() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getListingForUser({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.listingData = res.data || {};
        this.selectedAddress = this.listingData?.customerAddress || {}
        this.swiperReady();
        this.listingData.listingOrders.forEach((order: any) => {
          order.count = order.quantity !== undefined ? 0 : order.quantity;
          order.individualItemCost = order.price * order.count || 0;
        });
        this.calculateTotalCost();
      } else this.navigateToListings();
    }, (err) => {
      this.navigateToListings();
    })
  }


  selectDeliveryType(type: any) {
    this.selectedDeliveryType = type;
  }

  async openAddressList() {
    const modal = await this.model.create({ component: CustomerAddressListPage });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (data && data._id) this.selectedAddress = data;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  // goNext() {
  //   if (!this.swiper || this.swiper.destroyed) this.swiperReady();
  //   if (this.swiper && !this.swiper.destroyed) this.swiper.slideNext();
  // }

  // goPrev() {
  //   if (!this.swiper || this.swiper.destroyed) this.swiperReady();
  //   if (this.swiper && !this.swiper.destroyed) this.swiper.slidePrev();
  // }

  favItem() {
    this.adminService.setFavItem({ _id: this._id }).subscribe((res: any) => {
      if (res.success) {
        this.listingData.favourite = true;
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  unFavItem() {
    this.adminService.setUnFavItem({ _id: this._id }).subscribe((res: any) => {
      if (res.success) {
        this.listingData.favourite = false;
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  incrementCount(order: any) {
    if (order && 'count' in order && 'quantity' in order) {
      if (order.count < order.quantity) {
        order.count = (order.count || 0) + 1;
        order.individualItemCost = order.price * order.count || 0;
        this.calculateTotalCost();
      }
    } else {
      console.warn('Order object or its properties are undefined or missing.');
    }
  }

  decrementCount(order: any) {
    if (order.count && order.count > 0) {
      order.count--;
      order.individualItemCost = order.price * order.count || 0;
      this.calculateTotalCost();
    }
  }

  calculateTotalCost() {
    this.totalCost = this.listingData.listingOrders.reduce((sum: number, order: any) => {
      return sum + order.individualItemCost || 0;
    }, 0);
  }

  addToCart() {
    let orderedItems = this.listingData.listingOrders.filter((e: any) => e.count);
    let deliveryOption = this.listingData.deliveryOptions.find((e: any) => e.type == this.selectedDeliveryType);
    let obj = {
      refListingId: this.listingData._id,
      refMakerId: this.listingData.refMakerId,
      deliveryAddress: this.selectedAddress,
      deliveryOption: deliveryOption,
      note: this.note,
      finalCostWithOutDeliveryOption: this.totalCost,
      orderedItems: orderedItems
    }
    if (this.selectedAddress?._id && this.totalCost && this.selectedDeliveryType) {
      this.adminService.addToCart(obj).subscribe((res: any) => {
        if (res.success && res._id) {
          this.router.navigateByUrl('/orderSummary/' + res._id);
        }
        else this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
      }, (err) => {
        this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
      })
    } else {
      console.log("Please select")
    }
  }

  navigateToListings() {
    this.router.navigate(['/customerListings']);
  }

  confirmationToCancel(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
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
}
