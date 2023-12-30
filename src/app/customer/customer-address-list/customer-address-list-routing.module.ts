import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAddressListPage } from './customer-address-list.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerAddressListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerAddressListPageRoutingModule {}
