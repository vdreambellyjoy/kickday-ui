import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakerOrderOverviewPage } from './maker-order-overview.page';

const routes: Routes = [
  {
    path: '',
    component: MakerOrderOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakerOrderOverviewPageRoutingModule {}
