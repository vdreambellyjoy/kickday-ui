import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { AllUsersPage } from './all-users.page';
import { AllUsersPageRoutingModule } from './all-users-routing.module';
@NgModule({
  imports: [
    SharedModule,
    AllUsersPageRoutingModule
  ],
  declarations: [AllUsersPage]
})
export class AllUsersPageModule {}
