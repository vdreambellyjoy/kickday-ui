import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { CustomerProfilePage } from './customer-profile.page';
import { CustomerProfilePageRoutingModule } from './customer-profile-routing.module';


@NgModule({
  imports: [
    SharedModule,
    CustomerProfilePageRoutingModule
  ],
  declarations: [CustomerProfilePage]
})
export class CustomerProfilePageModule {}
