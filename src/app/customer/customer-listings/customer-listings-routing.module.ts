import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListingsPage } from './customer-listings.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerListingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerListingsPageRoutingModule {}
