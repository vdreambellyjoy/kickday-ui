import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  userData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
  }

  navigateToAllUsers(){
    this.router.navigate(['/allUsers']);
  }

}
