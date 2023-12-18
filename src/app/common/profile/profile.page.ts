import { Location } from '@angular/common';
import { IonSegment } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AdminService } from 'src/app/services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('segment') segment!: IonSegment;
  selectedSegment: string = 'profile';
  userData: any;
  profilePhoto: string = '';
  mediaImages: any = [];
  userDataForm: FormGroup;
  bankDetailsForm: FormGroup;
  mediaData: FormGroup;
  _id: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private sanitizer: DomSanitizer,
    private adminService: AdminService,
    private authService: AuthServiceService,
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
      imageId: '',
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
    this.mediaImages = [];
    this._id = this.router.url.split('/')[2];
    if (this._id) {
      this.adminService.getUserBasedOnId({ _id: this._id }).subscribe(
        async (res: any) => {
          if (res.success) {
            let logoFile = await this.authService.getLogoImageById({ fileId: res.data.profileId });
            let image: any = '';
            let imageName = logoFile?.data?.name
            if (!logoFile.success) image = '';
            if (logoFile.data.mimetype == "svg+xml") {
              image = await this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${logoFile.data.data}`);
            }
            image = `data:image/jpg;base64,${logoFile.data.data}`;
            this.userData = res.data || {};
            this.userData.image = image;
            this.userData.imageName = imageName;
            let media = [];
            this.userData.kitchenImages?.map(async (e: any) => {
              let localLogo = await this.authService.getLogoImageById({ fileId: e });
              let localimageName = localLogo?.data?.name
              let localimage: any = '';
              if (!localLogo.success) localimage = '';
              if (localLogo.data.mimetype == "svg+xml") {
                localimage = await this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${localLogo.data.data}`);
              }
              localimage = `data:image/jpg;base64,${localLogo.data.data}`;
              this.mediaImages.push({ image: localimage, imageName: localimageName, imageId: e });
            })
            this.userDataForm.patchValue({
              userName: this.userData.userName,
              email: this.userData.email,
              mobile: this.userData.mobileNumber,
              city: this.userData.address,
              bio: this.userData.bio,
              image: image,
              imageName: imageName,
              imageId: this.userData.profileId,
            });
            this.bankDetailsForm = this.fb.group({
              commission: this.userData.commission,
              accountName: this.userData.accountName,
              accountNumber: this.userData.accountNumber,
              accountType: this.userData.accountType,
              bankName: this.userData.bankName,
              branch: this.userData.branch,
              ifscCode: this.userData.ifscCode,
            })
          } else {
            this.router.navigate(['/adminDashboard']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  setAccountType(type: any) {
    this.bankDetailsForm.get('accountType')?.setValue(type);
  }

  saveProfile() {
    const formData = this.userDataForm.value;
    if (this.userDataForm.valid) {
      this.adminService.createMaker({ ...this.userDataForm.value, _id: this._id }).subscribe(async (res: any) => {
        if (res.success) {
          this.userData = res.data || {};
          let logoFile = await this.authService.getLogoImageById({ fileId: res.data.profileId });
          let image: any = '';
          let imageName = logoFile?.data?.name
          if (!logoFile.success) image = '';
          if (logoFile.data.mimetype == "svg+xml") {
            image = await this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${logoFile.data.data}`);
          }
          image = `data:image/jpg;base64,${logoFile.data.data}`;
          this.userData = res.data || {};
          this._id = this.userData._id;
          this.userData.image = image;
          this.userData.imageName = imageName;
          this.userDataForm.patchValue({
            userName: this.userData.userName,
            email: this.userData.email,
            mobile: this.userData.mobileNumber,
            city: this.userData.address,
            bio: this.userData.bio,
            image: image,
            imageName: imageName,
            imageId: this.userData.profileId,
          });
          this.selectedSegment = 'media';
          this.segment.value = 'media';
        }
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  saveMedia() {
    this.adminService.updateKitchenImages({ mobileNumber: this.userDataForm.value.mobile, image: this.mediaImages, _id: this._id }).subscribe((res: any) => {
      this.selectedSegment = 'bank';
      this.segment.value = 'bank';
    }, (err: any) => {
      console.log(err);
    })
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
          imageId: '',
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
        this.mediaImages.push({ image: imageData, imageName: file.name, imageId: '' });
      };
      reader.readAsDataURL(file);
    }
  }

  submitProfile() {
    if (this.bankDetailsForm.valid && this.userDataForm.valid && this.userData._id) {
      let bankData = { ...this.bankDetailsForm.value, ...this.userDataForm.value, _id: this.userData._id };
      this.adminService.updateBankDetails(bankData).subscribe((res: any) => {
        if (res.success) {
          if (this.userData.role == 'admin') this.router.navigate(['/allUsers']);
          else {
            localStorage.setItem('userData', JSON.stringify(res.userData));
            this.router.navigate(['/makerDashboard']);
          }


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
