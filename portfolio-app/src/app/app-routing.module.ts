import {
  NgModule
} from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';
import {
  PageNotFoundPage
} from './page-not-found/page-not-found.page';

const routes: Routes = [{
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full'
  }, {
    path: 'admins',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
  }, {
    path: '**',
    component: PageNotFoundPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
