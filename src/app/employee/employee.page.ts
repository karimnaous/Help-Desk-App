import { Component, OnInit } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
import {ModalPage} from '../Employee/modal/modal.page';

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
    const modal = await this.modalController.create({
      component: ModalPage

    });

    
    modal.present();
  }
}
