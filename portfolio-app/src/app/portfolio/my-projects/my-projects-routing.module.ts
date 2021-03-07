import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProjectsPage } from './my-projects.page';

const routes: Routes = [
  {
    path: '',
    component: MyProjectsPage
  },
  {
    path: 'open-project/:projectId',
    loadChildren: () => import('./open-project/open-project.module').then( m => m.OpenProjectPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProjectsPageRoutingModule {}
