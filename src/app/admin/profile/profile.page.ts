import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('segment')segment!: IonSegment;

  selectedSegment: string = 'profile';
  userData: any;

  // email: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  userDataForm: FormGroup;
  bankDetailsForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthServiceService) {
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

  ngOnInit() {
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
  }

  ionViewWillEnter() {
    this.bankDetailsForm.reset();
    this.userDataForm.reset();
    console.log('profile page');
    
  }

  setAccountType(type: any) {
    this.bankDetailsForm.get('accountType')?.setValue(type);
  }

  saveProfile() {
    // Save profile data here
    // ...
    console.log(this.userDataForm.value, 7272);
    if (this.userDataForm.valid) {
      // this.auth.saveProfile(this.userDataForm.value).subscribe(val => {
        this.selectedSegment = 'media';
    this.segment.value = 'media';
      // })
    }
    // Switch to the 'media' segment
  }

  saveMedia() {
    // Save media data here
    // ...

    // Switch to the 'bank' segment
    this.selectedSegment = 'bank';
    this.segment.value = 'bank';
  }

  submitProfile(){
    console.log(this.bankDetailsForm.value, 272);
    if (this.bankDetailsForm.valid && this.userDataForm.valid) {
      let bankData = {...this.bankDetailsForm.value, ...this.userDataForm.value};
      // bankData.email = this.userDataForm.get('email')?.value;
      this.auth.saveBankDetails(bankData).subscribe(val => {
        this.router.navigate(['/makers-list'])
      })
    }
    //added maker data api should be call here
  }

  navigateBackToMakersList() {
    this.router.navigate(['/makers-list'])
    //save the partial changes made in profile page
  }

}
