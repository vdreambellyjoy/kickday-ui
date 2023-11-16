import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  profileType: string = '';
  showConfirmPin: boolean = false;

  constructor() {}

  login() {
    // Handle login logic
  }

  createAccount() {
    this.showConfirmPin = true;
  }

}
