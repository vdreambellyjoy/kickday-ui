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
  selectedSegment: string = 'All';
  isToggleChecked: any = false;

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
    this.adminService.getListingBasedOnId({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.listingData = res.data || {};
        this.isToggleChecked = !this.listingData.makerData?.activeUser;
      }
      else this.goToBack();
    }, (err) => {
      this.goToBack();
    })
  }

  goToBack() {
    this.router.navigate(['/listings']);
  }

  openOrderDetails(order: any) {
    this.router.navigateByUrl('/customerOrderDetails/' + order._id)
  }

  editListing() {
    if (!this.listingData) return;
    this.router.navigateByUrl('/editListing/' + this.listingData._id)
  }

  toggleChanged() {
    this.adminService.activeDeActiveUser({ _id: this.listingData.refMakerId, value: this.isToggleChecked }).subscribe((res: any) => {
      if (res.success) {
        this.userData = res.data || {};
      } else {
        this.router.navigate(['/adminDashboard']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  deleteListing() {
    if (!this.listingData.customerOrders?.length) {
      this.adminService.deleteListing({ _id: this.listingData._id }).subscribe((res: any) => {
        this.navCtrl.back();
      }, (err: any) => {
        console.log(err);
      })
    }
  }
}
