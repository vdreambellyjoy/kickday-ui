import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllListingsPage } from './all-listings.page';

const routes: Routes = [
  {
    path: '',
    component: AllListingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllListingsPageRoutingModule {}
