import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrderDetailsPage } from './customer-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrderDetailsPageRoutingModule {}
