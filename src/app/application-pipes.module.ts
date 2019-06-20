import {  jsonParse } from './json-parse.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,jsonParse
   
  ],
  declarations: [ 
    jsonParse
  ],
  exports: [
  ]
})
export class ApplicationPipesModule {}