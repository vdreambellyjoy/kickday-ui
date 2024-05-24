import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-and-delivery-policy',
  templateUrl: './shipping-and-delivery-policy.page.html',
  styleUrls: ['./shipping-and-delivery-policy.page.scss'],
})
export class ShippingAndDeliveryPolicyPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }

  navigateBackToLogin() {
    this.route.navigate(['/login'])
  }

}
