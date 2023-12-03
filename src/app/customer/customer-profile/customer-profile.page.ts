import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.page.html',
  styleUrls: ['./customer-profile.page.scss'],
})
export class CustomerProfilePage implements OnInit {

  userDataForm: FormGroup;
  profilePhoto: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.userDataForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      bio: '',
      profilePhoto: ['', Validators.required],
    })
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userDataForm.reset();
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
    console.log(file, "fileeeee");
  
    if (file && this.userDataForm && this.userDataForm.get('profilePhoto')) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const imageData = e.target.result;
        this.userDataForm.patchValue({
          profilePhoto: imageData
        });
      };
  
      reader.readAsDataURL(file);
    }
  }

  saveProfile(){
    const formData = this.userDataForm.value;
    console.log(formData);
    
  }

}
