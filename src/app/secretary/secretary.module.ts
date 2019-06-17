import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecretaryPage } from './secretary.page';
import { AssignModalPage } from './assign-modal/assign-modal.page';
import { ViewModalPage } from './view-modal/view-modal.page';
import { jsonParse } from '../json-parse.pipe';
import { Toast } from '@ionic-native/toast/ngx';

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
  providers:[Toast],
  declarations: [SecretaryPage,AssignModalPage,ViewModalPage,jsonParse],
  entryComponents: [AssignModalPage,ViewModalPage],
  exports:[jsonParse]
})
export class SecretaryPageModule {}
