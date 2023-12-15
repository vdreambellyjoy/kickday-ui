import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.page.html',
  styleUrls: ['./user-overview.page.scss'],
})
export class UserOverviewPage implements OnInit {
  _id: any = '';
  userData: any = {};
  isDocumentsOpen = false;
  isMakerImagesOpen = false;
  isToggleChecked: boolean = false;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }
  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getUserBasedOnId({ _id: this._id }).subscribe((res: any) => {
      if (res.success) {
        this.userData = res.data || {};
        this.isToggleChecked = !this.userData.activeUser;
        this.getBankDetails();
      } else {
        this.router.navigate(['/adminDashboard']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }


  getBankDetails() {
    const bankData = [
      { label: 'Bank Name', value: this.userData?.bankName },
      { label: 'Branch', value: this.userData?.branch },
      { label: 'Account Number', value: this.userData?.accountNumber },
      { label: 'Account Name', value: this.userData?.accountName },
      { label: 'Account Type', value: this.userData?.accountType },
      { label: 'IFSC Code', value: this.userData?.ifscCode },
    ];
    return bankData;  
  }

  toggleChanged() {
    this.adminService.activeDeActiveUser({ _id: this._id, value: this.isToggleChecked }).subscribe((res: any) => {
      if (res.success) {
        this.userData = res.data || {};
      } else {
        this.router.navigate(['/adminDashboard']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  openKitchenImages(isOpen: boolean) {
    console.log(this.userData)
    this.isMakerImagesOpen = isOpen;
  }

  OpenDocuments(isOpen: boolean) {
    this.isDocumentsOpen = isOpen;
  }

  naviageteToProfilePage() {
    this.router.navigate(['/profile'])
  }

  navigateBackToMakersList() {
    this.router.navigate(['/allUsers'])
  }

  editMaker(makerData:any) {
    this.router.navigate(['/profile', { userId: makerData._id }]);
  }


}
