import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerListingOverviewPageRoutingModule } from './customer-listing-overview-routing.module';

import { CustomerListingOverviewPage } from './customer-listing-overview.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CustomerListingOverviewPageRoutingModule
  ],
  declarations: [CustomerListingOverviewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerListingOverviewPageModule {}
