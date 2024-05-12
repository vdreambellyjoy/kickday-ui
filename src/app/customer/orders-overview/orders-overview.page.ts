import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.page.html',
  styleUrls: ['./orders-overview.page.scss'],
})
export class OrdersOverviewPage implements OnInit {
  _id: any;
  orderData: any = {};
  constructor(
    private router: Router,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getCustomerOrders({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orderData = res.data[0];
      }
    }, (err) => {
      console.log(err);
    })
  }

  navigateToOrders() {
    this.router.navigate(['/orders'])
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
    let locationUrl = this.orderData?.deliveryAddress?.LocationUrl || '';
    if (!locationUrl && this.orderData && this.orderData.deliveryAddress) {
      locationUrl = this.orderData.deliveryAddress.LocationUrl || '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(locationUrl.replace(/,/g, ',<br>'));
  }

  redirectToGoogleMaps() {
    if (this.orderData?.deliveryAddress?.LocationUrl) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.orderData?.deliveryAddress?.LocationUrl)}`, '_blank');
    }
  }

}
