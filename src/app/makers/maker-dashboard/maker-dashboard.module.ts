import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakerDashboardPageRoutingModule } from './maker-dashboard-routing.module';

import { MakerDashboardPage } from './maker-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakerDashboardPageRoutingModule
  ],
  declarations: [MakerDashboardPage]
})
export class MakerDashboardPageModule {}
