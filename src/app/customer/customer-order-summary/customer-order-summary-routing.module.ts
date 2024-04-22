import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrderSummaryPage } from './customer-order-summary.page';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderSummaryPage
  }
];

@NgModule({
  imports: [SharedModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrderSummaryPageRoutingModule {}
