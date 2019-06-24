import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ModalPage} from '../employee/modal/modal.page';
import { EmployeePage } from './employee.page';
import {ViewPage} from '../employee/view/view.page';
import {EditPage} from '../employee/edit/edit.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
 
  declarations: [EmployeePage, ModalPage, ViewPage, EditPage],
  entryComponents: [ModalPage, ViewPage, EditPage]
  
})
export class EmployeePageModule {}
