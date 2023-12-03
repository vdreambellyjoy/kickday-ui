import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListingOverviewPage } from './customer-listing-overview.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerListingOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerListingOverviewPageRoutingModule {}
