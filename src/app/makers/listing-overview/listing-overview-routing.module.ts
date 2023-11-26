import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingOverviewPage } from './listing-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ListingOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingOverviewPageRoutingModule {}
