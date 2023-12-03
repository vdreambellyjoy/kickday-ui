import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-payment',
  templateUrl: './final-payment.page.html',
  styleUrls: ['./final-payment.page.scss'],
})
export class FinalPaymentPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(){

  }

  navigateToOrders() {
    this.router.navigateByUrl('/orders')
  }

  navigateToListings(){
    this.router.navigateByUrl('/listings')
  }

}
