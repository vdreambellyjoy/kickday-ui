import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('segment') segment!: IonSegment;
  selectedSegment: string = 'profile';
  userData: any;
  userDataForm: FormGroup;
  bankDetailsForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {
    this.userDataForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      bio: '',
    })
    this.bankDetailsForm = this.fb.group({
      commission: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branch: ['', Validators.required],
      ifscCode: ['', Validators.required],
    })
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.bankDetailsForm.reset();
    this.userDataForm.reset();
  }

  setAccountType(type: any) {
    this.bankDetailsForm.get('accountType')?.setValue(type);
  }

  saveProfile() {
    if (this.userDataForm.valid) {
      this.adminService.createMaker(this.userDataForm.value).subscribe((res: any) => {
        if (res.success) {
          this.userData = res.data || {};
          this.selectedSegment = 'media';
          this.segment.value = 'media';
        }
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  saveMedia() {
    this.selectedSegment = 'bank';
    this.segment.value = 'bank';
  }

  submitProfile() {
    if (this.bankDetailsForm.valid && this.userDataForm.valid && this.userData._id) {
      let bankData = { ...this.bankDetailsForm.value, ...this.userDataForm.value, _id: this.userData._id };
      this.adminService.updateBankDetails(bankData).subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['/allUsers']);

        }
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  navigateBackToMakersList() {
    this.router.navigate(['/allUsers']);
  }

}
