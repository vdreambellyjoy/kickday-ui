import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-customer-address-list',
  templateUrl: './customer-address-list.page.html',
  styleUrls: ['./customer-address-list.page.scss'],
})
export class CustomerAddressListPage implements OnInit {
  addressList: any = [];
  showAddressForm: any = false;
  deliveryDataForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
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
    this.deliveryDataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      LocationUrl: [''],
    });
    this.showAddressForm = false;
    this.adminService.getCustomerAddress({}).subscribe((res: any) => {
      this.addressList = res.data || []
    }, (err) => {
      this.addressList = []
    })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveDetails() {
    if (this.deliveryDataForm.valid) {
      this.adminService.addCustomerAddress(this.deliveryDataForm.value).subscribe((res: any) => {
        if (res.success) {
          this.ngAfterViewInit();
        }
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

  makeDefaultAddresses(_id: any) {
    this.adminService.setDefaultAddress({ _id: _id }).subscribe((res: any) => {
      if (res.success) {
        this.addressList = res.data || []
      }
      else this.openAlert('ERROR', 'something went wrong please try again', ['close']);
    }, (err) => {
      this.openAlert('ERROR', 'something went wrong please try again', ['close']);
    })
  }

  deleteAddress(_id: any) {
    this.adminService.deleteAddress({ _id: _id }).subscribe((res: any) => {
      if (res.success) {
        this.addressList = res.data || []
      }
      else this.openAlert('ERROR', 'something went wrong please try again', ['close']);
    }, (err) => {
      this.openAlert('ERROR', 'something went wrong please try again', ['close']);
    })
  }

  selectAddress(address: any) {
    console.log(address)
    this.modalCtrl.dismiss(address);
  }


}
