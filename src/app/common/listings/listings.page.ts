import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {
  userData: any = {};
  listings: any = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    this.adminService.getAllListings({}).subscribe(
      (res: any) => {
        if (res.success) this.listings = res.list.length ? res.list : [];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openListing(listing: any) {
    this.router.navigateByUrl('/listingOverView/' + listing._id);
  }

  goToBack() {
    this.router.navigate(['/adminDashboard']);
  }

  navigateToDashboard() {
    this.router.navigate(['/makerDashboard']);
  }

  navigateToCreateListing() {
    this.router.navigate(['/createListing']);
  }

  
}
