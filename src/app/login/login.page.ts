import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profileType: string = 'customer';
  showConfirmPin: boolean = false;
  mobileNumber: any = '';
  pin: any = '';
  confirmPin: any = '';
  resCode: any = 0;

  constructor(
    private route: Router,
    private auth: AuthServiceService
  ) {

  }
  ngOnInit() {

  }

  eventHandler(key: any) {
    this.resCode = 0;
  }

  login() {
    this.auth.login({ mobile: this.mobileNumber, pin: this.pin }).subscribe((res: any) => {
      this.resCode = res.status;
      if (res.userData?.role == "admin") res.userData.activeUser = true;
      if (!res.userData?.activeUser) this.resCode = 403;
      if (res.success && res.userData?.activeUser) {
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('userData', JSON.stringify(res.userData));
        this.navigatePages();
      }
    }, (err: any) => {
      this.resCode = err.status;
      console.log(err)
    })
  }

  createAccount() {
    this.showConfirmPin = true;
  }

  goBackToLogin() {
    this.showConfirmPin = false;
  }

  async goToListings() {
    await localStorage.clear();
    this.route.navigate(['/customerListings']);
  }

  createCustomer() {
    if (this.pin == this.confirmPin) {
      this.auth.createCustomer({ mobile: this.mobileNumber, pin: this.pin, role: this.profileType }).subscribe((res: any) => {
        this.resCode = res.status;
        if (res.success) {
          this.showConfirmPin = false;
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('userData', JSON.stringify(res.userData));
          this.navigatePages();
        }
      }, (err: any) => {
        this.resCode = err.status;
        console.log(err);
      })
    } else {
      console.log('pin not matched, show error message')
    }
  }

  navigatePages() {
    let userData: any = localStorage.getItem('userData');
    if (userData) {
      let userCopy = JSON.parse(userData);
      if (userCopy.role == 'admin') {
        localStorage.removeItem("order");
        this.route.navigate(['/adminDashboard']);
      }
      else if (userCopy.role == 'maker') {
        localStorage.removeItem("order");
        this.route.navigate(['/makerDashboard']);
      }
      else if (userCopy.role == 'customer') {
        let page = userCopy.firstTimeLogin ? '/customerProfile' : '/customerListings';
        let orderData: any = localStorage.getItem('order');
        let placedOrder = JSON.parse(orderData);
        console.log(`Order`, placedOrder);
        if (placedOrder) {
          this.route.navigateByUrl('/customerListings/' + placedOrder.refListingId);
        } else {
          this.route.navigate([page]);
        }
      }
    }
  }

}
