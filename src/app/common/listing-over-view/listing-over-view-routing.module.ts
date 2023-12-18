import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingOverViewPage } from './listing-over-view.page';

const routes: Routes = [
  {
    path: '',
    component: ListingOverViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingOverViewPageRoutingModule {}
