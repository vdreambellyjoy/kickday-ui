import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service'


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.page.html',
  styleUrls: ['./customer-profile.page.scss'],
})
export class CustomerProfilePage implements OnInit {

  userDataForm: FormGroup;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.userDataForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: [''],
      city: ['', Validators.required],
      bio: '',
      image: ['', Validators.required],
      imageName: [''],
    })
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.userDataForm.reset();
    let userData: any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    this.userDataForm.get('mobile')?.setValue(userData.mobileNumber);
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

  saveProfile() {
    const formData = this.userDataForm.value;
    this.adminService.updateCustomerDetails(formData).subscribe((res: any) => {
      this.route.navigate(['/customerListings']);
    }, (err: any) => {
      console.log('userNot found , show error')
    })
  }

}
