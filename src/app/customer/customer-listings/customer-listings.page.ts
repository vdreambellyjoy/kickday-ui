import { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-customer-listings',
  templateUrl: './customer-listings.page.html',
  styleUrls: ['./customer-listings.page.scss'],
})
export class CustomerListingsPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  selectedSegment: string = 'All';

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.adminService.getAllListingsForCustomer({}).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
    this.swiperReady();
  }

  navigateToSearch() {
  }

  navigateToOrders() {
  }

  navigateToDashboard() {
  }

  navigateToListingOverview() {
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
    }
  }

  goPrev() {
    if (!this.swiper || this.swiper.destroyed) {
      this.swiperReady();
    }

    if (this.swiper && !this.swiper.destroyed) {
      this.swiper.slidePrev();
    }
  }

}
