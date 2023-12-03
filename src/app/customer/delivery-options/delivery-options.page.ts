import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.page.html',
  styleUrls: ['./delivery-options.page.scss'],
})
export class DeliveryOptionsPage implements OnInit {

  deliveryDataForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.deliveryDataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      LocationUrl: ''
    })
  }

  ngOnInit() {
  }

  navigateBackToListingOverview(){
    this.router.navigate(['/listing-overview'])
  }

}
