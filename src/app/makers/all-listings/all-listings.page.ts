import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.page.html',
  styleUrls: ['./all-listings.page.scss'],
})
export class AllListingsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCreateListing(){
    this.router.navigate(['/create-listing'])
  }

  navigateToCustomerOrdersOverview(){
    this.router.navigate(['/customer-orders-overview'])
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard'])
  }

}
