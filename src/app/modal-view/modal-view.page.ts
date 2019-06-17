import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { empty } from 'rxjs';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.page.html',
  styleUrls: ['./modal-view.page.scss'],
})
export class ModalViewPage implements OnInit {

  modalTitle:string;
  modelId:number;
  arrayEmps: [any];
  
  ID: string; 
  public name : string; 
  public gender : string; 
  public date : string;
  public department : string;  
  public maritalStatus : string; 
  public role : string;
  public notes : string;
  public index : number;
  

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.index = this.findEmployee(this.ID);
    this.readEmployee(this.arrayEmps[this.index]); 
    if (this.department == "Accounting") { 
        this.departments[0]["isChecked"] = true;
    }
    else if (this.department == "Engineering") {
        this.departments[1]["isChecked"] = true;
    }
    else if (this.department == "Human Resources") { 
        this.departments[2]["isChecked"] = true;
    }
    else { 
        this.departments[3]["isChecked"] = true;
    }
     
  }

  public readEmployee(emp : object) {
      this.name = emp["Name"];
      this.gender = emp["Gender"];
      this.date = emp["Birthdate"];
      this.department = emp["Department"];
      this.maritalStatus = emp["MaritalStatus"];
      this.role = emp["Role"];
      this.notes = emp["Notes"];
  } 

  async closeModal(save:boolean) {
    if (save == true) {
        var i;
        this.department = "";
        for (i = 0; i < this.departments.length; i++) {
            if (this.departments[i]["isChecked"]) {
                if (this.department != "") {
                  this.department = this.department + ", " + this.departments[i]["val"];
                }
                else { this.department = this.departments[i]["val"]; } 
            }
        }
        let married = "Single";
        if (this.maritalStatus) { married = "Married"; }
        let emp = {ID: this.ID, Name : this.name, Gender:this.gender, Birthdate : this.date, Role : this.role , Department : this.department, MaritalStatus : married, Notes:this.notes};
        this.arrayEmps[this.index] = emp;
        const onClosedData: [any] = this.arrayEmps;
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

public findEmployee(ID: string) { 
  for (let i = 0; i < this.arrayEmps.length; i++) {
      if (this.arrayEmps[i]["ID"] == ID) {
          return i; 
      }    
  }
  // Entry not found
  return -1;
} 
}
