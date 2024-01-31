import { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
import { SearchPage } from 'src/app/customer/search/search.page';

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

  filterSearchTerm: string = '';
  filterDeliveryType: string = '';
  filterDeliveryDate: string = '';

  constructor(
    private router: Router,
    private model: ModalController,
    private alert: AlertController,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.filterSearchTerm = '';
    this.filterDeliveryType = '';
    this.filterDeliveryDate = '';
    this.adminService.getAllListingsForCustomer({}).subscribe(
      (res: any) => {
        this.listings = res.data || [];
        this.filteredItems = this.listings
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.swiperReady();
  }

  handlePress(event: any) {
    event.stopPropagation(); // Stop propagation to prevent interfering with swiper
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

  goToListingOverview(listing: any) {
    this.router.navigateByUrl('/customerListings/' + listing._id);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToProfile() {
    this.router.navigate(['/customerProfile']);
  }


  onSearch(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();
    if (!searchTerm || searchTerm.length < 1) {
      this.filteredItems = [...this.listings];
      return;
    }
    this.filteredItems = this.listings.filter((user: any) => {
      const category = (user && user.category) ? user.category.toLowerCase() : '';
      console.log(category, "searchhhh");
      return category.includes(searchTerm);
    });
  }

  async openSearchModel() {
    let obj = {
      search: this.filterSearchTerm || '',
      selectedDeliveryType: this.filterDeliveryType || '',
      selectedOption: this.filterDeliveryDate || ''
    }
    const modal = await this.model.create({ component: SearchPage, componentProps: obj });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (data) {
      this.filterSearchTerm = data.searchTerm;
      this.filterDeliveryType = data.deliveryType;
      this.filterDeliveryDate = data.deliveryDate;
      this.adminService.getAllListingsForCustomer({ search: this.filterSearchTerm || '', deliveryType: this.filterDeliveryType || '', deliveryDate: this.filterDeliveryDate || '' }).subscribe(
        (res: any) => {
          this.listings = res.data || [];
          this.filteredItems = this.listings
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  clearFilter() {
    this.filterSearchTerm = "";
    this.filterDeliveryType = "";
    this.filterDeliveryDate = "";
    this.adminService.getAllListingsForCustomer({}).subscribe(
      (res: any) => {
        this.listings = res.data || [];
        this.filteredItems = this.listings
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
