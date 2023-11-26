import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maker-order-overview',
  templateUrl: './maker-order-overview.page.html',
  styleUrls: ['./maker-order-overview.page.scss'],
})
export class MakerOrderOverviewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateBackToCustomerOrdersOverview(){
    this.router.navigate(['/customer-orders-overview'])
  }

}
