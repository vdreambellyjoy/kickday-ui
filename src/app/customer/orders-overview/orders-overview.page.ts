import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.page.html',
  styleUrls: ['./orders-overview.page.scss'],
})
export class OrdersOverviewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToOrders(){
    this.router.navigate(['/orders'])
  }

}
