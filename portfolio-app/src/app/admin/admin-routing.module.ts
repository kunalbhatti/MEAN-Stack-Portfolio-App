import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";
import {
  AuthGuard
} from "../guards/auth.guard";
import {
  ControlPanelGuard
} from "../guards/control-panel.guard";

import {
  AdminPage
} from "./admin.page";

const routes: Routes = [{
  path: '',
  component: AdminPage,
  children: [{
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full'
    }, {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'control-panel',
      loadChildren: () => import('./control-panel/control-panel.module').then(m => m.ControlPanelModule),
      canLoad: [ControlPanelGuard]

    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
