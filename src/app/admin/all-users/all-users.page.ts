import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {

  selectedSegment: string = 'All';
  usersList: any = [];
  constructor(private router: Router, private auth: AuthServiceService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.auth.getMakers({ match: 'all'}).subscribe(val => {
      this.usersList = val.data || [];
    })
  }

  changeSegment(event: any) {
    console.log(event.target.value, 'hiiii');
    this.auth.getMakers({match: event.target.value}).subscribe(val => {
      this.usersList = val.data;
    })
  }

  navigateToUserOverview(maker: any){
    this.router.navigateByUrl('/userOverview/' + maker._id)
  }

  naviageteToProfile(){
    this.router.navigateByUrl('/profile')
  }

  navigateBackToAdminDashboard(){
    this.router.navigateByUrl('/adminDashboard')
  }

}
