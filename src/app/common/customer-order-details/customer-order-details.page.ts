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
  selectedStatus: string = '';

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

  async ionViewWillEnter() {
    const loading = await this.adminService.presentLoading();
    this._id = this.router.url.split('/')[2];
    this.adminService.getCustomerOrders({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orderData = res.data;
        console.log(this.orderData, "order Dataaaa", this.orderData[0].status);
        this.selectedStatus = this.orderData[0].status;
        // const savedStatus = localStorage.getItem('selectedStatus');
        // if (savedStatus) {
        //   this.selectedStatus = savedStatus;
        // }
      }
      loading.dismiss()
    }, (err) => {
      loading.dismiss()
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
    this.selectedStatus = status;

    // Save the selected status to local storage if needed
    localStorage.setItem('selectedStatus', status);

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
}
