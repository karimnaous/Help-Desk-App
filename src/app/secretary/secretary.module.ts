import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecretaryPage } from './secretary.page';
import { AssignModalPage } from './assign-modal/assign-modal.page';
import { ViewModalPage } from './view-modal/view-modal.page';
// import { jsonParse } from '../json-parse.pipe';

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
  providers:[],
  declarations: [SecretaryPage,ViewModalPage,AssignModalPage],
  entryComponents: [ViewModalPage,AssignModalPage],
  exports:[]
})
export class SecretaryPageModule {}
