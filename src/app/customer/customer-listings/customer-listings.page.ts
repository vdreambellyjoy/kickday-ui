import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-customer-listings',
  templateUrl: './customer-listings.page.html',
  styleUrls: ['./customer-listings.page.scss'],
})
export class CustomerListingsPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined ;
  swiper?: Swiper;

  selectedSegment: string = 'All';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.swiperReady();
  }

  navigateToSearch(){
    this.router.navigate(['/search'])
  }

  navigateToOrders(){
    this.router.navigate(['/orders'])
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard'])
  }

  navigateToListingOverview(){
    this.router.navigate(['/listing-overview'])
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
