import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrderSummaryPage } from './customer-order-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrderSummaryPageRoutingModule {}
