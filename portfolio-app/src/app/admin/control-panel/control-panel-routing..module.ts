import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";
import {
  ControlPanelPage
} from "./control-panel.page";

const routes: Routes = [{
  path: '',
  component: ControlPanelPage,
  children: [{
      path: '',
      redirectTo: 'projects',
      pathMatch: 'full'
    },
    {
      path: 'projects',
      loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsPageModule)
    },
    {
      path: 'messages',
      loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule {

}
