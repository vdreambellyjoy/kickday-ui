import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  userData: any = {};
  userCount: any = 0;
  ordersCount: any = 0;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
  }

  ionViewWillEnter() {
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    this.adminService.getListingsCount({}).subscribe((res: any) => {
      if (res.success) {
        this.ordersCount = res.data || 0;
      }
    }, (err: any) => {
      console.log(err);
    })

    this.adminService.getUsersCount({}).subscribe((res: any) => {
      if (res.success) {
        this.userCount = res.data || 0;
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  navigateToAllUsers() {
    this.router.navigate(['/allUsers']);
  }

  navigateToListings() {
    this.router.navigate(['/listings']);
  }

  logOut() {
    this.authService.logOut({}).subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, (err: any) => {
      console.log(err);
    })
  }

  handleRefresh(event: any) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }


}
