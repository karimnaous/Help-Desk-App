import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ModalAdminPage } from '../modal-admin/modal-admin.page'
import { ModalAddPage } from '../modal-add/modal-add.page'
import { ModalViewPage } from '../modal-view/modal-view.page'
import { Guid } from "guid-typescript";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})

export class AdminPage implements OnInit {


  dataReturned : any;
  employees;

  ngOnInit() {
    this.getEmployees().then((employees) => {
      this.employees = employees;
    });

     
  }

  constructor(
    public modalController: ModalController, public http: HttpClient, public toastController: ToastController, public alertController: AlertController
  ) {  
  }


  async openModal(id: string) {
    const modal = await this.modalController.create({
      component: ModalAdminPage,
      componentProps: {
        "arrayEmps": this.employees,
        "emp" : this.employees[this.findEmployee(id)],
        "maritalStatus" : this.maritalStatus,
        "ID": id,
        "findEmployee": this.findEmployeeBound,
        "saveEmployee": this.saveEmployeeBound,
        "saveEmployees": this.saveEmployeesBound,
        "readEmployee": this.readEmployeeBound,
        "editEmployee": this.editEmployee,
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
        "emp": this.createEmp(),
        "ID": Guid.create()["value"],
        "findEmployee": this.findEmployeeBound,
        "saveEmployee": this.saveEmployeeBound,
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
    console.log(this.employees[this.findEmployee(id)]);
    const modal = await this.modalController.create({
      component: ModalViewPage,
      componentProps: {
        "arrayEmps": this.employees,
        "emp" : this.employees[this.findEmployee(id)],
        "ID": id,
        "findEmployee": this.findEmployeeBound,
        "saveEmployees": this.saveEmployeesBound,
        "readEmployee": this.readEmployeeBound,
        "displayDate": this.displayDateBound,
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


  public getEmployees(): any {
    return this.http.get('https://localhost:44304/api/Employee/GetAllEmployees').toPromise();
  }


  // Bound Methods
  public findEmployee(ID: string) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i]["id"] == ID) {
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

  public saveEmployee(emp: object) {
    let headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': "application/json",
      
    });
    let options = { headers: headers };
    let url = "https://localhost:44304/api/Employee/PostEmployee";
    this.http.post(url, emp, options)
      .subscribe( error => {
        console.log(error);
      });
  }
  public saveEmployeeBound = this.saveEmployee.bind(this);

  public editEmployee(emp: object) {
    let headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': "application/json",
      
    });
    let options = { headers: headers };
    this.http.post("https://localhost:44304/api/Employee/PostEmployee/aa37d8de-fecf-4c39-ba76-31ef9e9a1ce4", emp, options)
      .subscribe( error => {
        console.log(error);
      });
  }
  public editEmployeeBound = this.editEmployee.bind(this);

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
      if(employee["birthdate"] == "") {
          return "";
      }
      let date = new Date(employee["birthdate"]);
      return date;
  }
  public displayDateBound = this.displayDate.bind(this);

  emp: any = {}
  maritalStatus;
  public readEmployee(emp : object) {
    this.emp['fullname'] = emp["fullname"];
    this.emp['gender'] = emp["gender"];
    this.emp['birthdate'] = emp["birthdate"]; 
    this.emp['department'] = emp["department"];
    if (emp["marital_status"] == "Married") { this.maritalStatus = true; this.emp['marital_status'] = "Married"; }
    else { this.maritalStatus = false; this.emp['marital_status'] = "Single";}
    this.emp['employee_role'] = emp["employee_role"];
    this.emp['notes'] = emp["notes"];
    return this.emp;
  }
  public readEmployeeBound = this.readEmployee.bind(this);

  empAdd;
  public createEmp() {
      let empAdd = {
        id : "",
        fullname : "", 
        gender : "", 
        birthdate : "",
        department : "",  
        marital_status : "", 
        employee_role : "",
        notes : "",
      };
      return empAdd;
  }


}

