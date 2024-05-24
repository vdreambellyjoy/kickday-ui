import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancellationAndRefundPolicyPageRoutingModule } from './cancellation-and-refund-policy-routing.module';

import { CancellationAndRefundPolicyPage } from './cancellation-and-refund-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancellationAndRefundPolicyPageRoutingModule
  ],
  declarations: [CancellationAndRefundPolicyPage]
})
export class CancellationAndRefundPolicyPageModule {}
