import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { CustomerListingsPage } from './customer-listings.page';
import { CustomerListingsPageRoutingModule } from './customer-listings-routing.module';


@NgModule({
  imports: [
    SharedModule,
    CustomerListingsPageRoutingModule,
  ],
  declarations: [CustomerListingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerListingsPageModule {}
