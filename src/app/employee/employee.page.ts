import { Component, OnInit } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
import {ModalPage} from '../Employee/modal/modal.page';
import {ViewPage} from '../Employee/view/view.page';
import { viewAttached } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
  
})
export class EmployeePage implements OnInit {

  
  constructor( private modalController: ModalController) { }
  // constructor( ) { }

  
  ngOnInit() {
  }
 
  async openModal()
  {
    const modal = await this.modalController.create({component: ModalPage});
    modal.present();
  }

  async openView()
  {
    const view = await this.modalController.create({component: ViewPage});
    view.present();
  }
}
