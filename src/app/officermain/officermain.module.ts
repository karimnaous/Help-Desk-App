import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfficermainPage } from './officermain.page';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { ViewTasksPage } from '../officermain/view-tasks/view-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: OfficermainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfficermainPage, ModalPagePage, ViewTasksPage],
  entryComponents: [ModalPagePage, ViewTasksPage]
})
export class OfficermainPageModule {}
