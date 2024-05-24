import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancellation-and-refund-policy',
  templateUrl: './cancellation-and-refund-policy.page.html',
  styleUrls: ['./cancellation-and-refund-policy.page.scss'],
})
export class CancellationAndRefundPolicyPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }

  navigateBackToLogin() {
    this.route.navigate(['/login'])
  }

}
