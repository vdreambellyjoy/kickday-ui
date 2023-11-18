import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { UserOverviewPage } from './user-overview.page';
import { UserOverviewPageRoutingModule } from './user-overview-routing.module';
@NgModule({
  imports: [
    SharedModule,
    UserOverviewPageRoutingModule
  ],
  declarations: [UserOverviewPage]
})
export class UserOverviewPageModule {}
