import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserOverviewPage } from './user-overview.page';

const routes: Routes = [
  {
    path: '',
    component: UserOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserOverviewPageRoutingModule {}
