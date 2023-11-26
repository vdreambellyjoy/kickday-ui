import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.page.html',
  styleUrls: ['./listing-overview.page.scss'],
})
export class ListingOverviewPage implements OnInit {

  selectedSegment: string = 'All';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateBackToCustomerOrders(){
    this.router.navigate(['/customer-orders'])
  }

  navigateToOrderFullDetails(){
    this.router.navigate(['/order-full-details'])
  }

}
