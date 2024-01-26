import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersOverviewPageRoutingModule } from './orders-overview-routing.module';

import { OrdersOverviewPage } from './orders-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersOverviewPageRoutingModule
  ],
  declarations: [OrdersOverviewPage]
})
export class OrdersOverviewPageModule {}
