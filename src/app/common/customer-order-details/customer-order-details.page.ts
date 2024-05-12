import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.page.html',
  styleUrls: ['./customer-order-details.page.scss'],
})
export class CustomerOrderDetailsPage implements OnInit {
  _id: any = '';
  userData: any = {};
  orderData: any = {};

  confirmedDisabled: boolean = false;
  dispatchedDisabled: boolean = false;
  deliveredDisabled: boolean = false;
  cancelledDisabled: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getCustomerOrders({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orderData = res.data;
        console.log(this.orderData, "order Dataaaa");

        // Update disabled status based on order status
        this.updateDisabledStatus();
      }
    }, (err) => {
      console.log(err);
    });

    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    console.log(this._id);
  }

  goToBack() {
    this.navCtrl.back();
  }

  changeStatus(status: any) {
    console.log(status);
    if (status === 'Dispatched') {
      this.confirmedDisabled = true;
    } else if (status === 'Delivered') {
      this.confirmedDisabled = true;
      this.dispatchedDisabled = true;
      this.cancelledDisabled = true;
    } else if (status === 'Cancelled') {
      this.confirmedDisabled = true;
      this.dispatchedDisabled = true;
      this.deliveredDisabled = true;
    }

    this.adminService.changeOrderStatus({ status: status, _id: this._id }).subscribe((res: any) => {

    }, (err: any) => {
      console.log((err));
    });
  }

  formatTimestamp(dateString: string | number | Date) {
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

  callNumber(phoneNumber: string): void {
    window.open(`tel:${phoneNumber}`, '_system');
  }

  getSanitizedLocationUrl(): SafeHtml {
    let locationUrl = this.orderData[0]?.deliveryAddress?.LocationUrl || '';
    if (!locationUrl && this.orderData[0] && this.orderData[0]?.deliveryAddress) {
      locationUrl = this.orderData[0]?.deliveryAddress.LocationUrl || '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(locationUrl.replace(/,/g, ',<br>'));
  }

  private updateDisabledStatus() {
    if (this.orderData.status === 'Dispatched') {
      this.confirmedDisabled = true;
    } else if (this.orderData.status === 'Delivered') {
      this.confirmedDisabled = true;
      this.dispatchedDisabled = true;
      this.cancelledDisabled = true;
    } else if (this.orderData.status === 'Cancelled') {
      this.confirmedDisabled = true;
      this.dispatchedDisabled = true;
      this.deliveredDisabled = true;
    }
  }
}
