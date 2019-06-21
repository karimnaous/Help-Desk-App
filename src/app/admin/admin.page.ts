import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalAdminPage } from '../modal-admin/modal-admin.page'
import { ModalAddPage } from '../modal-add/modal-add.page'
import { ModalViewPage } from '../modal-view/modal-view.page'
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-home',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})

export class AdminPage implements OnInit {


  dataReturned : any;
  employees: any;

  ngOnInit() {
     this.employees = this.getEmployees();
  }

  constructor(
    public modalController: ModalController, public toastController: ToastController, public alertController: AlertController
  ) {  
  }


  async openModal(id: string) {
    const modal = await this.modalController.create({
      component: ModalAdminPage,
      componentProps: {
        "arrayEmps": this.getEmployees(),
        "emp" : this.readEmployee(this.getEmployees()[this.findEmployee(id)]),
        "maritalStatus" : this.maritalStatus,
        "ID": id,
        "findEmployee": this.findEmployeeBound,
        "saveEmployees": this.saveEmployeesBound,
        "readEmployee": this.readEmployeeBound,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }


  async openModalAdd() {
    const modal = await this.modalController.create({
      component: ModalAddPage,
      componentProps: {
        "arrayEmps": this.getEmployees(),
        "ID": Guid.create()["value"],
        "findEmployee": this.findEmployeeBound,
        "saveEmployees": this.saveEmployeesBound,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }


  async openModalView(id: string) {
    const modal = await this.modalController.create({
      component: ModalViewPage,
      componentProps: {
        "arrayEmps": this.getEmployees(),
        "emp" : this.readEmployee(this.getEmployees()[this.findEmployee(id)]),
        "ID": id,
        "findEmployee": this.findEmployeeBound,
        "saveEmployees": this.saveEmployeesBound,
        "readEmployee": this.readEmployeeBound,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      try {
        if (dataReturned !== null) {
          this.dataReturned = dataReturned.data; 
          if (this.dataReturned.clicked) {
              this.openModal(this.dataReturned.id);
          }
        }

      }
      catch(e) {}
    });
    return await modal.present();
  }


  public getEmployees(): Object {
    let myJSON = localStorage.getItem('Employees');
    if (myJSON != null) {
      let myJSON = localStorage.getItem('Employees');
      let myObj = JSON.parse(myJSON);
      return myObj;
    }
    else {
      return [];
    }
  }


  // Bound Methods
  public findEmployee(ID: string) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i]["ID"] == ID) {
        return i;
      }
    }
    // Entry not found
    return -1;
  }
  public findEmployeeBound = this.findEmployee.bind(this);


  public saveEmployees(emps: object) {
    this.employees = emps;
    localStorage.setItem("Employees", JSON.stringify(emps))
  }
  public saveEmployeesBound = this.saveEmployees.bind(this);


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }


  public displayDate(employee) {
      if(employee["Birthdate"] == "") {
          return "";
      }
      let date = new Date(employee["Birthdate"]);
      return date;
  }


  emp: any = {}
  maritalStatus;
  public readEmployee(emp : object) {
    this.emp['Name'] = emp["Name"];
    this.emp['Gender'] = emp["Gender"];
    this.emp['Birthdate'] = emp["Birthdate"];
    this.emp['Department'] = emp["Department"];
    if (emp["MaritalStatus"] == "Married") { this.maritalStatus = true; this.emp['MaritalStatus'] = "Married"; }
    else { this.maritalStatus = false; this.emp['MaritalStatus'] = "Single";}
    this.emp['Role'] = emp["Role"];
    this.emp['Notes'] = emp["Notes"];
    return emp;
  }
  public readEmployeeBound = this.readEmployee.bind(this);


}




