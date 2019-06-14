import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { empty } from 'rxjs';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.page.html',
  styleUrls: ['./modal-admin.page.scss'],
})
export class ModalAdminPage implements OnInit {

  modalTitle:string;
  modelId:number;
  arrayEmps: [any];
  ID: number; 

  public name : string; 
  public gender : string; 
  public date : string;
  public department : string; 
  // public departments : [any];
  // checkbox returns true up 
  public maritalStatus : boolean; 
  // radio return undefined if unselected
  public role : string;
  public notes : string;
  

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.readEmployee(this.arrayEmps[this.ID]);
    // console.log(this.arrayEmps[this.ID].Name)
    console.log(this.departments[0]["isChecked"]);
    // this.departments[0]["isChecked"] = 
    if (this.department == "Accounting") { 
        this.departments[0]["isChecked"] = true;
    }
     
  }

  public readEmployee(emp : object) {
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
        let married = "Single";
        if (this.maritalStatus) { married = "Married"; }
        let emp = {Name : this.name, Gender:this.gender, Birthdate : this.date, Role : this.role , Department : this.department, MaritalStatus : married, Notes:this.notes};
        // console.log(emp);
        this.arrayEmps[this.ID] = emp;
        // console.log(this.arrayEmps);
        const onClosedData: [any] = this.arrayEmps;
        console.log(onClosedData);
        await this.modalController.dismiss(onClosedData);
    }
    else {
        const onClosedData: [any] = this.arrayEmps;
        await this.modalController.dismiss(onClosedData);
    }
  }

public departments = [
    {val: "Accounting", isChecked: false},
    {val: "Engineering", isChecked: false},
    {val: "Human Resources", isChecked: false},
    {val: "Information Technology", isChecked: false},
];


}
