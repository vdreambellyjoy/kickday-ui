import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-maker-dashboard',
  templateUrl: './maker-dashboard.page.html',
  styleUrls: ['./maker-dashboard.page.scss'],
})
export class MakerDashboardPage implements OnInit {

  userData: any = {};
  moneyEarned: any = 0;
  listingsCount: any = 0;
  isToggleChecked: boolean = false;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    this.adminService.getMakerDashboardData({}).subscribe((res: any) => {
      if (res.success) {
        this.moneyEarned = res.moneyEarned;
        this.listingsCount = res.listingsCount;
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  toggleChanged() {
    !this.isToggleChecked;
  }

  navigateToAllListings() {
    this.router.navigate(['/listings'])
  }

  navigateToCreateListing() {
    this.router.navigate(['/createListing'])
  }

  editMaker() {
    this.router.navigateByUrl('/editprofile/' + this.userData._id)
  }
}
