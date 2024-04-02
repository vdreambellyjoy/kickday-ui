import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {
  selectedSegment: string = 'all';
  usersList: any = [];
  filteredUsersList: any = [];

  constructor(
    private router: Router, 
    private navCtrl: NavController,
    private adminService: AdminService
    ) { }
  ngOnInit() { }

  ionViewWillEnter() {
    this.adminService.getAllUsersList({ selectedTab: this.selectedSegment }).subscribe((res: any) => {
      if (res.success) {
        this.usersList = res.data || [];
        this.filteredUsersList = [...this.usersList];
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  changeSegment(event: any) {
    this.selectedSegment = event.target.value;
    this.adminService.getAllUsersList({ selectedTab: this.selectedSegment }).subscribe((res: any) => {
      if (res.success) {
        this.usersList = res.data || [];
        this.filteredUsersList = [...this.usersList];
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  navigateToUserOverview(maker: any) {
    this.router.navigateByUrl('/userOverview/' + maker._id)
  }

  naviageteToProfile() {
    this.router.navigate(['/profile']);
  }

  goToBack() {
    this.router.navigate(['/adminDashboard']);
  }

  handleRefresh(event:any) {
    this.ionViewWillEnter();
    event.target.complete();
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();  
    if (!searchTerm || searchTerm.length < 1) {
      this.filteredUsersList = [...this.usersList];
      return;
    }
  
    this.filteredUsersList = this.usersList.filter((user: any) => {
      const userName = user.userName.toLowerCase();
      const mobile = user.mobileNumber;
      return userName.includes(searchTerm) || mobile.includes(searchTerm);
    });
  }
  
}
