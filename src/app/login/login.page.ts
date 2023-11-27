import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router';

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

  constructor(
    private auth: AuthServiceService,
    private route: Router
  ) { }
  ngOnInit() {

  }


  login() {
    this.auth.login({ mobile: this.mobileNumber, pin: this.pin }).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('userData', JSON.stringify(res.userData));
        this.navigatePages();
      }
    }, (err: any) => {
      console.log('userNot found , show error')
    })
  }

  createAccount() {
    this.showConfirmPin = true;
  }

  goBackToLogin() {
    this.showConfirmPin = false;
  }

  createCustomer() {
    if (this.pin == this.confirmPin) {
      this.auth.createCustomer({ mobile: this.mobileNumber, pin: this.pin, role: this.profileType }).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('userData', JSON.stringify(res.userData));
          this.navigatePages();
        }
      }, (err: any) => {
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
        this.route.navigate(['/adminDashboard']);
      }
      else if (userCopy.role == 'maker') {
        this.route.navigate(['/makerDashboard']);
      }
      else if (userCopy.role == 'customer') {

      }
    }
  }

}
