import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";
import {
  PortfolioPage
} from "./portfolio.page";

const routes: Routes = [{
  path: '',
  component: PortfolioPage,
  children: [{
      path: '',
      redirectTo: 'projects',
      pathMatch: 'full'
    }, {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
      path: 'projects',
      loadChildren: () => import('./my-projects/my-projects.module').then(m => m.MyProjectsPageModule)
    },
  ]
}, ]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {

}
