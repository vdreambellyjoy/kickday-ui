import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.page.html',
  styleUrls: ['./listing-overview.page.scss'],
})
export class ListingOverviewPage implements OnInit {
  _id: any = '';
  selectedSegment: string = 'All';
  listingData: any = [];

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    this.adminService.getListingBasedOnId({ _id: this._id }).subscribe((res: any) => {
      if (res.success) {
        this.listingData = res.data || {};
      }
      else this.navigateToListings();
    }, (err: any) => {
      console.log(err);
    })
  }

  deleteListing() {
    this.adminService.deleteListing({ _id: this._id }).subscribe((res: any) => {
      this.navigateToListings();
    }, (err: any) => {
      console.log(err);
    })
  }

  editListing() {
    this.router.navigateByUrl('/editLlisting/' + this._id);
  }

  navigateToListings() {
    this.router.navigate(['/makerListings'])
  }

  navigateToOrderFullDetails() {
    // this.router.navigate(['/order-full-details'])
  }

}
