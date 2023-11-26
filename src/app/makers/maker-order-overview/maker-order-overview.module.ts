import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakerOrderOverviewPageRoutingModule } from './maker-order-overview-routing.module';

import { MakerOrderOverviewPage } from './maker-order-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakerOrderOverviewPageRoutingModule
  ],
  declarations: [MakerOrderOverviewPage]
})
export class MakerOrderOverviewPageModule {}
