import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { CustomerListingOverviewPage } from './customer-listing-overview.page';
import { CustomerListingOverviewPageRoutingModule } from './customer-listing-overview-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CustomerListingOverviewPageRoutingModule
  ],
  declarations: [CustomerListingOverviewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerListingOverviewPageModule {}
