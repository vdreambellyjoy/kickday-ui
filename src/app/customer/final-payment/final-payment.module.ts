import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalPaymentPageRoutingModule } from './final-payment-routing.module';

import { FinalPaymentPage } from './final-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalPaymentPageRoutingModule
  ],
  declarations: [FinalPaymentPage]
})
export class FinalPaymentPageModule {}
