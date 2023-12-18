import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerOrderDetailsPageRoutingModule } from './customer-order-details-routing.module';

import { CustomerOrderDetailsPage } from './customer-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerOrderDetailsPageRoutingModule
  ],
  declarations: [CustomerOrderDetailsPage]
})
export class CustomerOrderDetailsPageModule {}
