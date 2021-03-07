import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import {
  FormsModule
} from "@angular/forms";
import {
  IonicModule
} from "@ionic/angular";

import {
  AuthRoutingModule
} from './auth-routing.module';

import {
  AuthPage
} from './auth.page';


@NgModule({
  declarations: [AuthPage],
  imports: [CommonModule, AuthRoutingModule, IonicModule, FormsModule]
})
export class AuthModule {

}
