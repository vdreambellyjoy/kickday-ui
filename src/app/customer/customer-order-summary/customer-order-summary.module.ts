import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerOrderSummaryPageRoutingModule } from './customer-order-summary-routing.module';

import { CustomerOrderSummaryPage } from './customer-order-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerOrderSummaryPageRoutingModule
  ],
  declarations: [CustomerOrderSummaryPage]
})
export class CustomerOrderSummaryPageModule {}
