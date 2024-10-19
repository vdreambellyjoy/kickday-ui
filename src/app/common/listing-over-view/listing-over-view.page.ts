import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-over-view',
  templateUrl: './listing-over-view.page.html',
  styleUrls: ['./listing-over-view.page.scss'],
})
export class ListingOverViewPage implements OnInit {
  _id: any = '';
  userData: any = {};
  listingData: any = {};
  selectedSegment: string = 'All';
  isToggleChecked: any = false;
  orderData: any = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
    this.adminService.getListingBasedOnId({ _id: this._id }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.listingData = res.data || {};
        this.orderData = this.listingData?.customerOrders?.length ? [...this.listingData?.customerOrders] : [];
        this.isToggleChecked = this.listingData.deActive;
        this.selectedSegment = 'All'; // Set the segment to All when entering the view
        this.changeSegment({ target: { value: this.selectedSegment } }); // Apply the filter
      }
      else this.goToBack();
    }, (err) => {
      this.goToBack();
    })
  }

  changeSegment(event: any) {
    this.selectedSegment = event.target.value;
    if (this.selectedSegment == "pickUp") {
      this.listingData.customerOrders = this.orderData.filter((e: any) => (e.deliveryOption?.type == "Pickup Available"));
    } else if (this.selectedSegment == "All") {
      this.listingData.customerOrders = this.orderData;
    } else {
      this.listingData.customerOrders = this.orderData.filter((e: any) => e.status == this.selectedSegment);
    }
    // if(event)
  }



  goToBack() {
    this.selectedSegment = 'All';
    this.router.navigate(['/listings']);
  }

  openOrderDetails(order: any) {
    this.router.navigateByUrl('/customerOrderDetails/' + order._id)
  }

  editListing() {
    if (!this.listingData) return;
    this.router.navigateByUrl('/editListing/' + this.listingData._id)
  }

  toggleChanged() {
    this.adminService.activeDeActiveListing({ _id: this.listingData._id, value: this.isToggleChecked }).subscribe((res: any) => {
      if (res.success) {
        // this.userData = res.data || {};
      } else {
        this.router.navigate(['/adminDashboard']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }


  async deleteListing() {
    const confirmed = await this.adminService.presentDeleteConfirmation('Confirm', 'Are you sure you want to delete?', '');
    console.log({ confirmed });
    if (confirmed) {
      this.adminService.deleteListing({ _id: this.listingData._id }).subscribe((res: any) => {
        this.navCtrl.back();
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  formatTimestamp(dateString: string | number | Date) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const time = date.toLocaleString('en-US', options);
    const formattedDate = `${day} ${month} ${weekday} ${time}`;

    return formattedDate;
  }
}
