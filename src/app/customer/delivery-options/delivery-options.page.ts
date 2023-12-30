import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.page.html',
  styleUrls: ['./delivery-options.page.scss'],
})
export class DeliveryOptionsPage implements OnInit {

  deliveryDataForm: FormGroup;
  _id: any;
  addressList: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService,
    private alertController: AlertController
  ) {
    this.deliveryDataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      LocationUrl: [''],
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getCustomerAddress({}).subscribe((res: any) => {
      this.addressList = res.data || []
    }, (err) => {
      this.openAlert('ERROR', 'something went wrong while getting Address', ['close']);
    })
  }



  navigateBackToListingOverview() {
    this.router.navigateByUrl('/customerListings/' + this._id);
  }

  navigateToListings() {
    this.router.navigate(['/customerListings']);
  }

  saveDetails() {
    if (this.deliveryDataForm.valid) {
      this.adminService.addCustomerAddress(this.deliveryDataForm.value).subscribe((res: any) => {
        if (res.success) this.navigateBackToListingOverview();
        else this.openAlert('ERROR', 'something went wrong please try again', ['close']);
      }, (err) => {
        this.openAlert('ERROR', 'something went wrong please try again', ['close']);
      })
    } else {
      this.openAlert('Warning', 'please fill all mandatory fields image', ['close']);
    }
  }

  async openAlert(header: any, message: any, buttons: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
      mode: 'ios',
    });

    await alert.present();
  }
}
