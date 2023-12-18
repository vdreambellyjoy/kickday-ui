import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingOverViewPageRoutingModule } from './listing-over-view-routing.module';

import { ListingOverViewPage } from './listing-over-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingOverViewPageRoutingModule
  ],
  declarations: [ListingOverViewPage]
})
export class ListingOverViewPageModule {}
