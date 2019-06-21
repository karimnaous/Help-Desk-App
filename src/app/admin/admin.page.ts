import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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


  dataReturned : any;
  employees: any;


  ngOnInit() {
  }

  
  constructor(
    public modalController: ModalController, public toastController: ToastController, public alertController: AlertController
  ) {
    // localStorage.clear();
    // if (localStorage.length <= 0 && this.getEmployees() != null) {
    //   let employee = [
    //     { ID: Guid.create()["value"], Name: "Jason", Gender: "Male", Birthdate: "Jun-30-1999", Role: "Administrator", Department: "Information Technology", MaritalStatus: "Married", Notes: "None" },
    //     { ID: Guid.create()["value"], Name: "Alex", Gender: "Male", Birthdate: "Jan-02-1999", Role: "Secretary", Department: "Human Resources", MaritalStatus: "Single", Notes: "None" },
    //     { ID: Guid.create()["value"], Name: "Karim", Gender: "Male", Birthdate: "Dec-16-1999", Role: "Employee", Department: "Accounting", MaritalStatus: "Single", Notes: "None" },
    //     { ID: Guid.create()["value"], Name: "Leen", Gender: "Female", Birthdate: "Feb-07-1999", Role: "Officer", Department: "Information Technology", MaritalStatus: "Single", Notes: "None" }
    //   ];
    //   this.saveEmployees(employee);
    // }
    this.employees = this.getEmployees();
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
        // "saveEmployee": this.saveEmployeeBound,
        "departments": this.departments,
        "readDepartment": this.readDepartment,
        "saveDepartment": this.saveDepartmentBound,
        "readEmployee": this.readEmployeeBound,
      }
    });
    // const toast = await this.toastController.create({
    //   message: 'Employee details updated.',
    //   duration: 2000
    // });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        // this.saveEmployees(this.dataReturned);
      }
      // this.presentAlertMultipleButtons()
      // toast.present();
    });
    return await modal.present();
  }


  async openModalAdd() {
    // const toast = await this.toastController.create({
    //   message: 'Added Employee.',
    //   duration: 2000
    // });
    const modal = await this.modalController.create({
      component: ModalAddPage,
      componentProps: {
        "arrayEmps": this.getEmployees(),
        "ID": Guid.create()["value"],
        "findEmployee": this.findEmployeeBound,
        "saveEmployees": this.saveEmployeesBound,
        "departments": this.departments,
        "readDepartment": this.readDepartment,
        "saveDepartment": this.saveDepartmentBound,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
      // toast.present();
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


  // public saveEmployee(emp: {}, index: number) {
  //   console.log("inside saveEmployee");
  //   let employees = this.getEmployees();
  //   console.log(employees);
  //   employees[index] = this.emp;
  //   localStorage.setItem("Employees", JSON.stringify(employees))
  // }
  // public saveEmployeeBound = this.saveEmployees.bind(this);


  public saveDepartment() {
    let department = "";
    for (let i = 0; i < this.departments.length; i++) {
      if (this.departments[i]["isChecked"]) {
        if (department != "") {
          department = department + ", " + this.departments[i]["val"];
        }
        else { department = this.departments[i]["val"]; }
      }
    }
    return department;
  }
  public saveDepartmentBound = this.saveDepartment.bind(this);


  public departments = [
    { val: "Accounting", isChecked: false },
    { val: "Engineering", isChecked: false },
    { val: "Human Resources", isChecked: false },
    { val: "Information Technology", isChecked: false },
  ];


  public readDepartment(department: string) {
    if (department.includes("Accounting")) {
      this.departments[0]["isChecked"] = true;
    }
    else { this.departments[0]["isChecked"] = false; }
    if (department.includes("Engineering")) {
      this.departments[1]["isChecked"] = true;
    }
    else { this.departments[1]["isChecked"] = false; }
    if (department.includes("Human Resources")) {
      this.departments[2]["isChecked"] = true;
    }
    else { this.departments[2]["isChecked"] = false; }
    if (department.includes("Information Technology")) {
      this.departments[3]["isChecked"] = true;
    }
    else { this.departments[3]["isChecked"] = false; }
  }
  public readDepartmentBound = this.readDepartment.bind(this);

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
    // console.log("Inside readEmployee");
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




