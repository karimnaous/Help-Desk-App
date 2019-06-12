// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.page.html',
//   styleUrls: ['./admin.page.scss'],
// })
// export class AdminPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import  { ModalController } from '@ionic/angular';
import { ModalAdminPage } from '../modal-admin/modal-admin.page'

@Component({
  selector: 'app-home',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class AdminPage implements OnInit {
  
  dataReturned:any;

  ngOnInit() {
  }

  constructor(
    public modalController: ModalController
  ) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalAdminPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }
}