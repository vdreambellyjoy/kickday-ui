import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AdminService } from 'src/app/services/admin.service';
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

}
