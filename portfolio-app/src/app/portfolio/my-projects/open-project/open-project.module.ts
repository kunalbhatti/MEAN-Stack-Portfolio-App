import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenProjectPageRoutingModule } from './open-project-routing.module';

import { OpenProjectPage } from './open-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenProjectPageRoutingModule
  ],
  declarations: [OpenProjectPage]
})
export class OpenProjectPageModule {}
