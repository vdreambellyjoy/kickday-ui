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
  listings: any;
  filteredItems: any[] = [];

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.adminService.getAllListingsForCustomer({}).subscribe(
      (res: any) => {
        console.log(res);
        this.listings = res.list || [];
        this.filteredItems = this.listings
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.swiperReady();
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

  goToListingOverview(listing:any) {
    this.router.navigateByUrl('/customerListings/' + listing._id);
  }

  goToOrders() {}

  goToDashboard() {
    this.router.navigate(['/customerProfile']);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // Filter items based on the 'category' property
    this.filteredItems = this.listings.filter((item: { category: string; }) =>
      item.category.toLowerCase().includes(searchTerm)
    );
  }
}
