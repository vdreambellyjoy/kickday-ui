import { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
import { SearchPage } from 'src/app/customer/search/search.page';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  listings: any[] = [];
  filteredItems: any[] = [];
  isLoading = true; // Default to true
  imagesLoaded: boolean = false;
  loadedImagesCount: number = 0;

  filterSearchTerm: string = '';
  filterDeliveryType: string = '';
  filterDeliveryDate: string = '';
  showMenu: boolean = false;

  constructor(
    private router: Router,
    private model: ModalController,
    private alert: AlertController,
    private adminService: AdminService,
    private authService: AuthServiceService
  ) {
    this.filteredItems = this.listings;
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.isLoading = true; // Set loading to true while data is being fetched
    const loading = await this.adminService.presentLoading();
    this.filterSearchTerm = '';
    this.filterDeliveryType = '';
    this.filterDeliveryDate = '';
    this.adminService.getAllListingsForCustomer({}).subscribe(
      (res: any) => {
        this.listings = res.data || [];
        this.filteredItems = this.listings;
        this.isLoading = false; // Set loading to false once data is fetched
        loading.dismiss()
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false; // Set loading to false in case of error
        loading.dismiss()
      }
    );
    if (localStorage.getItem('token') && localStorage.getItem('userData')) {
      let localToken: any = localStorage.getItem('token');
      let token: any = JSON.parse(localToken);
      this.authService.checkUserToken({ token: token }).subscribe((res: any) => {
        if (res.data && res.success) {
          localStorage.setItem('userData', JSON.stringify(res.data));
          this.showMenu = true;
        } else {
          this.showMenu = false;
        }
      }, (err => {
        localStorage.clear();
        this.showMenu = false;
      }))
    } else {
      localStorage.clear();
      this.showMenu = false;
    }
    this.swiperReady();
  }

  onImageLoad() {
    this.loadedImagesCount++;
    console.log(`Image loaded. Count: ${this.loadedImagesCount}`);
    if (this.loadedImagesCount === this.getTotalImageCount()) {
      this.imagesLoaded = true;
      console.log('All images loaded.');
    }
  }

  getTotalImageCount(): number {
    let total = 0;
    this.filteredItems.forEach(item => {
      total += (item.imageArray && item.imageArray.length) ? item.imageArray.length : 0;
    });
    if (total === 0) {
      this.imagesLoaded = true; // If there are no images, set imagesLoaded to true
    }
    console.log(`Total image count: ${total}`);
    return total;
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

  goToLogin() {
    this.router.navigate(['/login']);
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

  handleRefresh(event: any) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
