import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }

  navigateBackToLogin() {
    this.route.navigate(['/login'])
  }

}
