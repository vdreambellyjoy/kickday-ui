import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';

import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    SharedModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
