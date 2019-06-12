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
  ) {

    let employee1 = {Name:"jason", Birthdate:"Jun-01-1999", Role:"administrator" , Department:"IT", MaritalStatus:"Single", Notes:"None"};
    let employee2 = {Name:"jason", Birthdate:"Jun-01-1999", Role:"administrator" , Department:"IT", MaritalStatus:"Single", Notes:"None"};
    let employee3 = {Name:"jason", Birthdate:"Jun-01-1999", Role:"administrator" , Department:"IT", MaritalStatus:"Single", Notes:"None"};
    // localStorage.setItem("employee1", JSON.stringify(employee1));
    localStorage.setItem("employee2", JSON.stringify(employee2));
    localStorage.setItem("employee3", JSON.stringify(employee3));
  }


    
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