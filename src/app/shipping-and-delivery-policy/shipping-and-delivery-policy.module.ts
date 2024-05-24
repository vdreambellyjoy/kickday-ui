import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingAndDeliveryPolicyPageRoutingModule } from './shipping-and-delivery-policy-routing.module';

import { ShippingAndDeliveryPolicyPage } from './shipping-and-delivery-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShippingAndDeliveryPolicyPageRoutingModule
  ],
  declarations: [ShippingAndDeliveryPolicyPage]
})
export class ShippingAndDeliveryPolicyPageModule {}
