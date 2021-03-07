import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { AdminRoutingModule } from "./admin-routing.module";

import { AdminPage } from "./admin.page";

@NgModule({
  declarations: [AdminPage],
  imports: [CommonModule, AdminRoutingModule, IonicModule],
  exports: []
})
export class AdminModule{

}
