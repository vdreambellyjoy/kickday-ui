import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingOverviewPageRoutingModule } from './listing-overview-routing.module';

import { ListingOverviewPage } from './listing-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingOverviewPageRoutingModule
  ],
  declarations: [ListingOverviewPage]
})
export class ListingOverviewPageModule {}
