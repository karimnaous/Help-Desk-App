
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  arrayEmps: [any];
  ID: string; 

  emp = {
    name : "", 
    gender : "", 
    date : "",
    department : "",  
    maritalStatus : false, 
    role : "",
    notes : "",
}
  public name = ""; 
  public gender = ""; 
  public date = "";
  public department = "";  
  public maritalStatus = false; 
  public role = "";
  public notes = "";
  public index = "";

  // Bound methods
  saveEmployees;
  departments;
  saveDepartment;
  readDepartment;


  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.ID = this.navParams.data.ID;
    this.departments = this.navParams.data.departments;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.saveEmployees = this.navParams.data.saveEmployees;
    this.saveDepartment = this.navParams.data.saveDepartment;  
    this.readDepartment = this.navParams.data.saveDepartment;
    // this.readDepartment();
  }

  async closeModal(save:boolean) {
    if (save == true) {
        // this.department = this.saveDepartment(this.department);
        let married = "Single";
        if (this.maritalStatus) { married = "Married"; }
        let emp = {ID: this.ID, Name : this.name, Gender:this.gender, Birthdate : this.date, Role : this.role , Department : this.department, MaritalStatus : married, Notes:this.notes};
        this.arrayEmps.push(emp);
        this.saveEmployees(this.arrayEmps);
        const onClosedData = null;
        await this.modalController.dismiss(onClosedData);
    }
    else {
        const onClosedData = null;
        await this.modalController.dismiss(onClosedData);
    }
  }



}