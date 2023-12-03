import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerProfilePageRoutingModule } from './customer-profile-routing.module';

import { CustomerProfilePage } from './customer-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomerProfilePageRoutingModule
  ],
  declarations: [CustomerProfilePage]
})
export class CustomerProfilePageModule {}
