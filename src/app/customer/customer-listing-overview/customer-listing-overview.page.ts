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
  count: number = 0;
  _id: any = '';
  listingData: any = {};
  totalCost: number = 0;

  constructor(
    private router: Router,
    private model: ModalController,
    private alert: AlertController,
    private adminService: AdminService,
  ) { }

  ngOnInIt() {

  }

  ngAfterViewInit() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getListingForUser({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.listingData = res.data || {};
        this.swiperReady();

        if (Array.isArray(this.listingData.listingOrders)) {
          this.listingData.listingOrders.forEach((order: any) => {
            order.count = order.quantity !== undefined ? 0 : order.quantity;
            order.individualItemCost = order.price * order.count || 0;
          });

          this.calculateTotalCost();
        } else {
          console.warn('Listing orders array is missing or invalid.');
        }
      } else this.navigateToListings();
    }, (err) => {
      this.navigateToListings();
    })
  }

  async openAddressList() {
    const modal = await this.model.create({
      component: CustomerAddressListPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    if (!this.swiper || this.swiper.destroyed) this.swiperReady();
    if (this.swiper && !this.swiper.destroyed) this.swiper.slideNext();
  }

  goPrev() {
    if (!this.swiper || this.swiper.destroyed) this.swiperReady();
    if (this.swiper && !this.swiper.destroyed) this.swiper.slidePrev();
  }

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
    console.log('pk')
    // this.adminService.addToCart(this.deliveryDataForm.value).subscribe((res: any) => {
    //   if (res.success) this.router.navigate(['/finalPayment']);
    //   else this.openAlert('ERROR', 'something went wrong please try again', ['close']);
    // }, (err) => {
    //   this.openAlert('ERROR', 'something went wrong please try again', ['close']);
    // })
  }

  navigateToListings() {
    this.router.navigate(['/customerListings']);
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
