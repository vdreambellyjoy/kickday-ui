import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.page.html',
  styleUrls: ['./user-overview.page.scss'],
})
export class UserOverviewPage implements OnInit {

  isToggleChecked: boolean = true;
  isMakerImagesOpen = false;
  isDocumentsOpen = false;
  id: any;
  userData: any

  constructor(private router: Router, private auth: AuthServiceService) { }

  ngOnInit() {
    this.id = this.router.url.split('/')[2];
    console.log(this.id);
    // this.auth.getMakerById({_id: this.id}).subscribe(val => {
      
    // })
    
  }

  ionViewWillEnter() {
    this.auth.getMakerById({_id: this.id}).subscribe(val => {
      this.userData = val.data;
    })
  }

  getBankDetails(): { label: string; value: string }[] {
    return [
      { label: 'Bank Name', value: this.userData?.bankDetails?.bankName },
      { label: 'Branch', value: this.userData?.bankDetails?.branch },
      { label: 'Account Number', value: this.userData?.bankDetails?.accountNumber },
      { label: 'Account Name', value: this.userData?.bankDetails?.accountName },
      { label: 'Account Type', value: this.userData?.bankDetails?.accountType },
      { label: 'IFSC Code', value: this.userData?.bankDetails?.ifscCode },
    ];
  }

  toggleChanged() {
    console.log(this.isToggleChecked);
  }

  openKitchenImages(isOpen: boolean) {
    this.isMakerImagesOpen = isOpen;
  }

  OpenDocuments(isOpen: boolean) {
    this.isDocumentsOpen = isOpen;
  }

  naviageteToProfilePage(){
    this.router.navigate(['/profile'])
  }

  navigateBackToMakersList(){
    this.router.navigate(['/allUsers'])
  }

}
