import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
    private adminService: AdminService,
    private authService: AuthServiceService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    let data: any = localStorage.getItem('userData');
    if (!data || data == 'undefined' || data == 'undefined') {
      this.authService.localLogOut();
    }
    else {
      this.userData = JSON.parse(data);
      this.isToggleChecked = false;
      this.adminService.getMakerDashboardData({}).subscribe((res: any) => {
        if (res.success) {
          this.moneyEarned = res.moneyEarned;
          this.listingsCount = res.listingsCount;
        }
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  toggleChanged() {
    this.adminService.toggleMakerStatus({ value: true }).subscribe((res: any) => {
      if (res.success && res.userData) {
        localStorage.setItem('userData', JSON.stringify(res.userData));
        if (this.isToggleChecked) this.router.navigate(['/customerListings']);
      }
    }, ((err: any) => {
      console.log('error at updating role', err.message);
    }))
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

  logOut() {
    this.authService.logOut({}).subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate(['/customerListings']);
    }, (err: any) => {
      console.log(err);
    })
  }
}
