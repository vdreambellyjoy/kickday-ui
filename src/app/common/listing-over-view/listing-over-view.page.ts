import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-over-view',
  templateUrl: './listing-over-view.page.html',
  styleUrls: ['./listing-over-view.page.scss'],
})
export class ListingOverViewPage implements OnInit {
  _id: any = '';
  userData: any = {};
  listingData: any = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    this.adminService.getListingBasedOnId({_id:this._id}).subscribe((res: any) => {
      if (res.success && res.data) this.listingData = res.data;
      else this.goToBack();
    }, (err) => {
      this.goToBack();
    })
  }

  goToBack() {
    this.navCtrl.back(); // Or perform your desired action
  }

}
