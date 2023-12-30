import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { CustomerAddressListPage } from './customer-address-list.page';
import { CustomerAddressListPageRoutingModule } from './customer-address-list-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CustomerAddressListPageRoutingModule
  ],
  declarations: [CustomerAddressListPage]
})
export class CustomerAddressListPageModule {}
