import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakerDashboardPage } from './maker-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MakerDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakerDashboardPageRoutingModule {}
