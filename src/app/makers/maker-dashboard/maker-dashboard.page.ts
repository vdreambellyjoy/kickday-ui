import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-maker-dashboard',
  templateUrl: './maker-dashboard.page.html',
  styleUrls: ['./maker-dashboard.page.scss'],
})
export class MakerDashboardPage implements OnInit {

  isToggleChecked: boolean = false;
  moneyEarned: any = 0;
  listingsCount: any = 0;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
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
    this.router.navigate(['/makerListings'])
  }

  navigateToCreateListing() {
    this.router.navigate(['/createLlisting'])
  }
}
