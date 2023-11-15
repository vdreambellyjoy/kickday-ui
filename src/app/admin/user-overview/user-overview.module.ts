import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserOverviewPageRoutingModule } from './user-overview-routing.module';

import { UserOverviewPage } from './user-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserOverviewPageRoutingModule
  ],
  declarations: [UserOverviewPage]
})
export class UserOverviewPageModule {}
