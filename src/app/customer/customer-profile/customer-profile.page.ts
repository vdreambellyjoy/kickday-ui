import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service'
import { AuthServiceService } from '../../services/auth-service.service'


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.page.html',
  styleUrls: ['./customer-profile.page.scss'],
})
export class CustomerProfilePage implements OnInit {

  userDataForm: FormGroup;
  userData: any;
  edit: any = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private adminService: AdminService,
    private authService: AuthServiceService
  ) {
    this.userDataForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: [''],
      city: ['', Validators.required],
      bio: '',
      image: ['', Validators.required],
      imageName: [''],
      imageId: ''
    })
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    let userDataCopy: any = localStorage.getItem('userData');
    this.userData = JSON.parse(userDataCopy) || {};

    if (this.userData.profileId) {
      this.edit = true;
      let localLogo = await this.authService.getLogoImageById({ fileId: this.userData.profileId });
      let localimageName = localLogo?.data?.name
      let localimage: any = '';
      if (!localLogo.success) localimage = '';
      if (localLogo.data.mimetype == "svg+xml") {
        localimage = await this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${localLogo.data.data}`);
      }
      localimage = `data:image/jpg;base64,${localLogo.data.data}`;
      this.userDataForm.patchValue({
        image: localimage,
        imageName: localimageName,
        imageId: this.userData.profileId,
      })
    }
    if (this.userData) {
      this.userDataForm.patchValue({
        userName: this.userData.userName,
        email: this.userData.email,
        mobile: this.userData.mobileNumber,
        city: this.userData.address,
        bio: this.userData.bio
      });
    }
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
          imageId: ''
        });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    const formData = this.userDataForm.value;
    this.adminService.updateCustomerDetails(formData).subscribe((res: any) => {
      if (res.success && res.data) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.router.navigate(['/customerListings']);
      }
    }, (err: any) => {
      console.log('userNot found , show error')
    })
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToDashboard() {
    this.router.navigate(['/customerListings']);
  }

  logOut() {
    this.authService.logOut({}).subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, (err: any) => {
      console.log(err);
    })
  }

}
