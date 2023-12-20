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
      }
      else this.navigateToListings();
    }, (err) => {
      this.navigateToListings();
    })
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

  incrementCount() {
    this.count++;
  }

  decrementCount() {
    if (this.count > 0) {
      this.count--;
    }
  }

  navigatetoTab3() {
    this.router.navigate(['/final-payment']);
  }

  navigateToListings() {
    this.router.navigate(['/customerListings']);
  }
}
