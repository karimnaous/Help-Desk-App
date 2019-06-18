import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { empty } from 'rxjs';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.page.html',
  styleUrls: ['./modal-admin.page.scss'],
})
export class ModalAdminPage implements OnInit {

  arrayEmps: [any];
  ID: string; 

  // emp;

  public name : string; 
  public gender : string; 
  public date : string;
  public department : string;  
  public maritalStatus : boolean; 
  public role : string;
  public notes : string;
  public index : number;
  
  readDepartment;
  departments;
  findEmployee;
  saveEmployees;
  saveDepartment; 
  readEmployeeBound;


  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.findEmployee = this.navParams.data.findEmployee;
    this.saveEmployees = this.navParams.data.saveEmployees;
    this.departments = this.navParams.data.departments;
    this.readDepartment = this.navParams.data.readDepartment;
    this.saveDepartment = this.navParams.data.saveDepartment;
    // this.readEmployeeBound = this.navParams.data.readEmployee; 
    // this.emp = this.navParams.data.emp; 
    this.index = this.findEmployee(this.ID);

    this.readEmployee(this.arrayEmps[this.index]);
    this.readDepartment(this.department);
  
  }

  public readEmployee(emp : object) {
      console.log("Inside readEmployee");
      this.name = emp["Name"];
      this.gender = emp["Gender"];
      this.date = emp["Birthdate"];
      this.department = emp["Department"];
      if (emp["MaritalStatus"] == "Married") { this.maritalStatus = true; } 
      else { this.maritalStatus = false; }
      this.role = emp["Role"];
      this.notes = emp["Notes"];
  } 

  async closeModal(save:boolean) {
    if (save == true) {
        this.department = this.saveDepartment();
        let married = "Single";
        if (this.maritalStatus) { let married = "Married"; }
        let emp = {ID: this.ID, Name : this.name, Gender:this.gender, Birthdate : this.date, Role : this.role , Department : this.department, MaritalStatus : married, Notes:this.notes};
        this.arrayEmps[this.index] = emp;
        this.saveEmployees(this.arrayEmps);
        const onClosedData = null;
        await this.modalController.dismiss(onClosedData);
    }
    else {
        const onClosedData = null;;
        await this.modalController.dismiss(onClosedData);
    }
  }

}
