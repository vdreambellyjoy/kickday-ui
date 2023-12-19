import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.page.html',
  styleUrls: ['./customer-order-details.page.scss'],
})
export class CustomerOrderDetailsPage implements OnInit {
  _id: any = '';
  userData: any = {};
  orderData: any = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    console.log(this._id)
  }

  goToBack() {
    this.navCtrl.back();
  }
}
