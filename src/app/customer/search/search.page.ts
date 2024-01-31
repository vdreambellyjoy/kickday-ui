import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  selectedOption: string = '';
  selectedDeliveryType: string = '';
  search: any = "";

  constructor(
    private modalCtrl: ModalController,
    private adminService: AdminService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  closePopup() {
    if (this.search || this.selectedDeliveryType || this.selectedOption) {
      this.modalCtrl.dismiss({ searchTerm: this.search || '', deliveryType: this.selectedDeliveryType || '', deliveryDate: this.selectedOption || '' });
    } else {
      this.modalCtrl.dismiss();
    }
  }


  selectOption(option: string) {
    this.selectedOption = option;
  }

  selectDeliveryType(option: string) {
    this.selectedDeliveryType = option;
  }
}
