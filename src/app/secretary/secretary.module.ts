import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecretaryPage } from './secretary.page';
import { AssignModalPage } from './assign-modal/assign-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SecretaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SecretaryPage,AssignModalPage],
  entryComponents: [AssignModalPage]
})
export class SecretaryPageModule {}
