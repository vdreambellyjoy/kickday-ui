import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { Swiper } from 'swiper';

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
    private adminService: AdminService
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
      } else {
        this.navigateToListings();
      }
    }, (err) => {
      this.navigateToListings();
    });
  }



  navigateToDeliveryOptions() {
    this.router.navigateByUrl('/delivery-options')
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
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }

  unFavItem() {
    this.adminService.setUnFavItem({ _id: this._id }).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }

  incrementCount(order: any) {
    if (order && 'count' in order && 'quantity' in order) {
      console.log(order.count, 325782577348, order.quantity, 37588574398);

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

  navigatetoTab3() {
    this.router.navigate(['/final-payment']);
  }

  navigateToListings() {
    this.router.navigate(['/customerListings']);
  }
}
