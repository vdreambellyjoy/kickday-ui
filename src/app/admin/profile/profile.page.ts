import { ActivatedRoute, Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  bindUserData: any
  profilePhoto: string = '';
  mediaImages: any = [];
  userDataForm: FormGroup;
  bankDetailsForm: FormGroup;
  mediaData: FormGroup;
  private _id: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute
  ) {
    this.userDataForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      bio: '',
      image: ['', Validators.required],
      imageName: [''],
    })
    this.mediaData = this.fb.group({
      mediaImages: ['', Validators.required]
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
    
  }

  ionViewWillEnter() {
    this.bankDetailsForm.reset();
    this.userDataForm.reset();
    this.activatedroute.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.adminService.getUserBasedOnId({ _id: userId }).subscribe(
          (res: any) => {
            if (res.success) {
              this.userData = res.data || {};
              this.bindUserData = { ...this.userData };
              this.userDataForm.patchValue(this.bindUserData); 
            } else {
              this.router.navigate(['/adminDashboard']);
            }
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }

  setAccountType(type: any) {
    this.bankDetailsForm.get('accountType')?.setValue(type);
  }

  saveProfile() {
    const formData = this.userDataForm.value;
    if (this.userDataForm.valid) {
      this.adminService.createMaker({ ...this.userDataForm.value, _id: this._id }).subscribe((res: any) => {
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
    let val = { ...this.userDataForm.value };
    this.adminService.updateKitchenImages({ ...val, image: this.mediaImages,_id: this._id }).subscribe((res: any) => {
    }, (err: any) => {
      console.log(err);
    })
    this.selectedSegment = 'bank';
    this.segment.value = 'bank';
  }


  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0] as File;
      this.uploadPhoto(file);
    }
  }

  uploadPhoto(file: File) {
    if (file && this.userDataForm && this.userDataForm.get('image')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageData = e.target.result;
        this.userDataForm.patchValue({
          image: imageData,
          imageName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  addMediaImages(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      this.addMultipleMediaImages(files);
    }
  }

  addMultipleMediaImages(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageData = e.target.result;
        this.mediaImages.push({ image: imageData, imageName: file.name });
      };
      reader.readAsDataURL(file);
    }
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
