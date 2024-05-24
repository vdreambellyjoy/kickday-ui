import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingAndDeliveryPolicyPage } from './shipping-and-delivery-policy.page';

const routes: Routes = [
  {
    path: '',
    component: ShippingAndDeliveryPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingAndDeliveryPolicyPageRoutingModule {}
