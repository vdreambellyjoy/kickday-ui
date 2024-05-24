import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancellationAndRefundPolicyPage } from './cancellation-and-refund-policy.page';

const routes: Routes = [
  {
    path: '',
    component: CancellationAndRefundPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancellationAndRefundPolicyPageRoutingModule {}
