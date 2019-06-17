import { Component, OnInit } from '@angular/core';
import  { ModalController } from '@ionic/angular';
import { ModalAdminPage } from '../modal-admin/modal-admin.page'
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';
// import * as uuid from 'userid'


@Component({
  selector: 'app-home',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})

export class AdminPage implements OnInit {
  
  dataReturned:any;

  ngOnInit() {
    if (localStorage.length <= 0) {
        let employee =  [
          {Name:"Jason", Gender:"Male", Birthdate:"Jun-30-1999", Role:"Administrator" , Department:"IT", MaritalStatus:"Married", Notes:"None"},
          {Name:"Alex", Gender:"Male", Birthdate:"Jan-02-1999", Role:"Secretary" , Department:"IT", MaritalStatus:"Single", Notes:"None"},
          {Name:"Karim", Gender:"Male", Birthdate:"Dec-16-1999", Role:"Employee" , Department:"Accounting", MaritalStatus:"Single", Notes:"None"},
          {Name:"Leen", Gender:"Female", Birthdate:"Feb-07-1999", Role:"Officer" , Department:"IT", MaritalStatus:"Single", Notes:"None"}
        ]; 
        localStorage.setItem("employee", JSON.stringify(employee));
    }
    else {
        let employee = this.getEmployees();
    }
  }
    
  constructor(
    public modalController: ModalController
  ) {
  }

  async openModal(id : number) {
    const modal = await this.modalController.create({
      component: ModalAdminPage,
      componentProps: {
        "arrayEmps" : this.getEmployees(),
        "ID" : id, 
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
      console.log(this.dataReturned);
      this.saveEmployees(this.dataReturned);
      // this.loadData(“Data”);
    });
 
    return await modal.present();
  }

  public saveEmployees(emps:object) {
      localStorage.setItem("employee", JSON.stringify(emps))
  }

  public getEmployees() : Object {
      if (localStorage.length > 0) {
        let myJSON = localStorage.getItem('employee');
        let myObj = JSON.parse(myJSON);
        return myObj;
      }
      else {
        return [];
      }
  }

  employees = this.getEmployees();

}