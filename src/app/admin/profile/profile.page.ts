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
  profilePhoto: string = '';
  mediaImages: string[] = [];
  userDataForm: FormGroup;
  bankDetailsForm: FormGroup;
  mediaData: FormGroup;
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
      profilePhoto: ['', Validators.required],
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

  ngOnInit() { }

  ionViewWillEnter() {
    this.bankDetailsForm.reset();
    this.userDataForm.reset();
  }

  setAccountType(type: any) {
    this.bankDetailsForm.get('accountType')?.setValue(type);
  }

  saveProfile() {
    const formData = this.userDataForm.value;
    console.log(formData);

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
    const mediaFormData = this.mediaImages;
    console.log(mediaFormData,"slected image urls");

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
        this.mediaImages.push(imageData);
      };
      console.log(this.mediaImages,"array of image Data");
      
      reader.readAsDataURL(file);
    }
  }

  // cropPhoto() {
  //   const container = this.photoContainer.nativeElement;
  //   const image = container.querySelector('img');

  //   if (image) {
  //     const canvas = document.createElement('canvas');
  //     // const context = canvas.getContext('2d');
  //     const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

  //     canvas.width = container.offsetWidth;
  //     canvas.height = container.offsetHeight;

  //     context.beginPath();
  //     context.arc(
  //       canvas.width / 2,
  //       canvas.height / 2,
  //       canvas.width / 2,
  //       0,
  //       2 * Math.PI
  //     );
  //     context.clip();
  //     context.drawImage(image, 0, 0, canvas.width, canvas.height);

  //     this.profilePhoto = canvas.toDataURL();
  //   }
  // }

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
