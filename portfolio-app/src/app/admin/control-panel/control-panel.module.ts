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
  ControlPanelRoutingModule
} from "./control-panel-routing..module";
import {
  ControlPanelPage
} from "./control-panel.page";
import {
  DeleteMessageComponent
} from "./modals/delete-message/delete-message.component";
import {
  DeleteProjectComponent
} from "./modals/delete-project/delete-project.component";
import {
  EditProjectComponent
} from "./modals/edit-project/edit-project.component";
import {
  ReplyToMessageComponent
} from "./modals/reply-to-message/reply-to-message.component";


@NgModule({
  declarations: [ControlPanelPage, EditProjectComponent, DeleteProjectComponent, DeleteMessageComponent, ReplyToMessageComponent],
  imports: [CommonModule, IonicModule, FormsModule, ControlPanelRoutingModule]

})
export class ControlPanelModule {

}
