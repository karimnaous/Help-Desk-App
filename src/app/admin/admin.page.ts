import { Component, OnInit } from '@angular/core';
import  { ModalController } from '@ionic/angular';
import { ModalAdminPage } from '../modal-admin/modal-admin.page'
import { ModalAddPage } from '../modal-add/modal-add.page'
import { ModalViewPage } from '../modal-view/modal-view.page'
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';
import { Guid } from "guid-typescript";


@Component({
  selector: 'app-home',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})

export class AdminPage implements OnInit {
  
  dataReturned:any;
  employees : any;

  ngOnInit() {
  }
    
  constructor(
    public modalController: ModalController
  ) {
      localStorage.clear();
      if (localStorage.length <= 0 && this.getEmployees() != null) {
          let employee =  [
            {ID:Guid.create()["value"], Name:"Jason", Gender:"Male", Birthdate:"Jun-30-1999", Role:"Administrator" , Department:"Information Technology", MaritalStatus:"Married", Notes:"None"},
            {ID:Guid.create()["value"], Name:"Alex", Gender:"Male", Birthdate:"Jan-02-1999", Role:"Secretary" , Department:"Human Resources", MaritalStatus:"Single", Notes:"None"},
            {ID:Guid.create()["value"], Name:"Karim", Gender:"Male", Birthdate:"Dec-16-1999", Role:"Employee" , Department:"Accounting", MaritalStatus:"Single", Notes:"None"},
            {ID:Guid.create()["value"], Name:"Leen", Gender:"Female", Birthdate:"Feb-07-1999", Role:"Officer" , Department:"Information Technology", MaritalStatus:"Single", Notes:"None"}
          ]; 
          this.saveEmployees(employee);
          console.log(employee);
      }
      else {
          let employee = this.getEmployees();
      }
      this.employees = this.getEmployees();

  }

  async openModal(id : number) {
    const modal = await this.modalController.create({
      component: ModalAdminPage,
      componentProps: {
        "arrayEmps" : this.getEmployees(),
        "ID" : this.getEmployees()[id]["ID"],
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
      this.saveEmployees(this.dataReturned);
    });
 
    return await modal.present();
  }

  async openModalAdd() {
    const modal = await this.modalController.create({
      component: ModalAddPage,
      componentProps: {
        "arrayEmps" : this.getEmployees(),
        "ID" : Guid.create()["value"],
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
      this.saveEmployees(this.dataReturned);
    });
    return await modal.present();
  }

  async openModalView(id : number) {
    const modal = await this.modalController.create({
      component: ModalViewPage,
      componentProps: {
        "arrayEmps" : this.getEmployees(),
        "ID" : this.getEmployees()[id]["ID"],
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
      console.log(this.dataReturned);
      this.saveEmployees(this.dataReturned);
    });
 
    return await modal.present();
  }

  public saveEmployees(emps:object) {
      this.employees = emps;
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

}




