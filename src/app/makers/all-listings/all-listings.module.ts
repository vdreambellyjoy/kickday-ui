import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllListingsPageRoutingModule } from './all-listings-routing.module';

import { AllListingsPage } from './all-listings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllListingsPageRoutingModule
  ],
  declarations: [AllListingsPage]
})
export class AllListingsPageModule {}
