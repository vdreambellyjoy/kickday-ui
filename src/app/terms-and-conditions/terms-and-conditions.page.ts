import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }

  navigateBackToLogin() {
    this.route.navigate(['/login'])
  }

}
