import { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { AdminService } from 'src/app/services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
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
  note: any = '';
  swiperHeight: string = '240px';
  userData: any;


  constructor(
    private router: Router,
    private model: ModalController,
    private alert: AlertController,
    private adminService: AdminService,
    private authService: AuthServiceService
  ) {
    this.selectedDeliveryType = null;
  }

  ngOnInIt() {
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  async ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    this.listingData = {};
    this.totalCost = 0;
    this.selectedDeliveryType = '';
    this.note = '';
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    const loading = await this.adminService.presentLoading();
    this.adminService.getListingForUser({ _id: this._id, userId: this.userData?._id || '' }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.listingData = res.data || {};
        this.swiperHeight = '241px';
        this.listingData.listingOrders.forEach((order: any) => {
          order.count = order.quantity !== undefined ? 0 : order.quantity;
          order.individualItemCost = order.price * order.count || 0;
        });
        this.calculateTotalCost();
      } else {
        this.navigateToListings();
      }
      loading.dismiss()
    }, (err) => {
      this.navigateToListings();
      loading.dismiss()
    });
    let orderData: any = localStorage.getItem('order');
    if (orderData) {
      let placedOrder = JSON.parse(orderData);
      localStorage.removeItem("order");
      this.continueProcess(placedOrder);
    }
  }


  selectDeliveryType(type: any) {
    this.selectedDeliveryType = type;
  }



  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
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
    let orderedItems = this.listingData.listingOrders.filter((e: any) => e.count);
    let deliveryOption = this.listingData.deliveryOptions.find((e: any) => e.type == this.selectedDeliveryType);
    let obj = {
      refListingId: this.listingData._id,
      refMakerId: this.listingData.refMakerId,
      deliveryOption: deliveryOption,
      note: this.note,
      finalCostWithOutDeliveryOption: this.totalCost,
      orderedItems: orderedItems
    }
    if (this.totalCost && this.selectedDeliveryType) {
      if (localStorage.getItem('token') && localStorage.getItem('userData')) {
        let localToken: any = localStorage.getItem('token');
        let token: any = JSON.parse(localToken);
        this.authService.checkUserToken({ token: token }).subscribe((res: any) => {
          if (res.data && res.success) {
            localStorage.setItem('userData', JSON.stringify(res.data));
            this.continueProcess(obj);
          } else {
            localStorage.setItem('order', JSON.stringify(obj));
            this.router.navigate(['/login']);
          }
        }, (err => {
          localStorage.clear();
          localStorage.setItem('order', JSON.stringify(obj));
          this.router.navigate(['/login']);
        }))
      } else {
        localStorage.clear();
        localStorage.setItem('order', JSON.stringify(obj));
        this.router.navigate(['/login']);
      }
    } else {
      console.log("Please select")
    }
  }

  continueProcess(obj: any) {
    this.adminService.addToCart(obj).subscribe((res: any) => {
      if (res.success && res._id) {
        this.router.navigateByUrl('/orderSummary/' + res._id);
      }
      else this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
    }, (err) => {
      this.openAlert('ERROR', 'something went wrong please try again later', ['close']);
    })
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

  async goBack() {
    let orderedItems = this.listingData?.listingOrders?.filter((e: any) => e.count);
    if (orderedItems.length) {
      const confirmed = await this.adminService.presentDeleteConfirmation('Confirm', 'Sure you want to cancel the order?', '');
      console.log({ confirmed });
      if (confirmed) this.router.navigate(['/customerListings']);
    } else {
      this.router.navigate(['/customerListings']);
    }
  }

  formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const time = date.toLocaleString('en-US', options);
    const formattedDate = `${day} ${month} ${weekday} ${time}`;

    return formattedDate;
  }

  shareLink() {
    if (navigator.share) {
      const title = this.listingData?.listingOrders?.[0]?.name || '🍽️ Title not available';
      const orderEndsOn = this.listingData.orderEndsOn ? this.formatDate(this.listingData.orderEndsOn) : '⏳ End date not available';
      const orderDeliveredOn = this.listingData.orderDeliveredOn ? this.formatDate(this.listingData.orderDeliveredOn) : '📦 Delivered date not available';
      const makerLocation = this.listingData.makerData?.address || '📍 Location not available';

      // Build a more engaging message
      let text = `🍔✨ *Delicious Food Alert!* ✨🍕\n\n`;

      text += `🍽️ *Item* : ${title}\n`;

      text += `\n⏰ *Order Ends On* : ${orderEndsOn}\n`;

      text += `📦 *Order Delivered On* : ${orderDeliveredOn}\n`;

      text += `📍 *Location* : ${makerLocation}\n`;

      // Fun call-to-action
      text += `\n👉 *Order Now and Savor the Flavor!* 🍴💖\n`;

      // Final call-to-action with the link
      text += `\n🚀 *Check it out here* : ${location.href}\n`;

      navigator.share({
        text: text,
        // url: location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => {
          console.log('Error sharing:', error);
          alert('Error sharing content. Please try again.');
        });
    } else {
      console.log('Web Share API not supported.');
      alert('Web Share API not supported.');
    }
  }


}
