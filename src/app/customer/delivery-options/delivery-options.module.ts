import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryOptionsPageRoutingModule } from './delivery-options-routing.module';

import { DeliveryOptionsPage } from './delivery-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DeliveryOptionsPageRoutingModule
  ],
  declarations: [DeliveryOptionsPage]
})
export class DeliveryOptionsPageModule {}
