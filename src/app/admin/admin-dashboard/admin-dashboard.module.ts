import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared.module';

import { AdminDashboardPage } from './admin-dashboard.page';
import { AdminDashboardPageRoutingModule } from './admin-dashboard-routing.module';


@NgModule({
  imports: [
    SharedModule,
    AdminDashboardPageRoutingModule
  ],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
