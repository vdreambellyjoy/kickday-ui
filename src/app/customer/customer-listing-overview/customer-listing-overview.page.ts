import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-customer-listing-overview',
  templateUrl: './customer-listing-overview.page.html',
  styleUrls: ['./customer-listing-overview.page.scss'],
})
export class CustomerListingOverviewPage {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined ;
  swiper?: Swiper;

  count: number = 0;

  constructor(private router: Router) {}

  ngOnInIt(){

  }

  ngAfterViewInit() {
    this.swiperReady();
  }

  navigatetoProfile(){
    this.router.navigateByUrl('/profile')
  }

  navigatetoLogin(){
    this.router.navigateByUrl('/login')
  }

  incrementCount() {
    this.count++;
  }

  decrementCount() {
    if (this.count > 0) {
      this.count--;
    }
  }

  navigatetoTab3(){
    this.router.navigateByUrl('/final-payment')
  }

  navigateToListings(){
    this.router.navigateByUrl('/listings')
  }

  navigateToDeliveryOptions(){
    this.router.navigateByUrl('/delivery-options')
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
 
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
    console.log('Swiper ready:', this.swiper);
  }

  goNext() {
    if (!this.swiper || this.swiper.destroyed) {
      this.swiperReady();
    }
  
    if (this.swiper && !this.swiper.destroyed) {
      this.swiper.slideNext();
      console.log("nextttt");
    }
  }
  
  goPrev() {
    if (!this.swiper || this.swiper.destroyed) {
      this.swiperReady();
    }

    if (this.swiper && !this.swiper.destroyed) {
      this.swiper.slidePrev();
      console.log("prevvvvvv");
    }
  }

}
