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

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }
}