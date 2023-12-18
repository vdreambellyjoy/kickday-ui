import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerListingsPageRoutingModule } from './customer-listings-routing.module';

import { CustomerListingsPage } from './customer-listings.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    CustomerListingsPageRoutingModule,
  ],
  declarations: [CustomerListingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerListingsPageModule {}
