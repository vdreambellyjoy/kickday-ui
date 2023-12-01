import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.page.html',
  styleUrls: ['./all-listings.page.scss'],
})
export class AllListingsPage implements OnInit {
  listings: any = [];

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.adminService.getMakerListings({}).subscribe((res: any) => {
      if (res.success) {
        this.listings = res.data;
        console.log(this.listings,"all listings data");
        
      }
    }, (err: any) => {
      console.log(err);
    })
  }


  navigateToCreateListing(){
    this.router.navigate(['/createLlisting']);
  }

  navigateToListingOverview(_id:any){
    this.router.navigateByUrl('/listingOverview/' + _id);
  }

  navigateToDashboard(){
    this.router.navigate(['/makerDashboard']);
  }

}
