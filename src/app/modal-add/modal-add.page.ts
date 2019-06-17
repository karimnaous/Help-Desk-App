
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  modalTitle:string;
  modelId:number;
  arrayEmps: [any];
  ID: string; 

  public name = ""; 
  public gender = ""; 
  public date = "";
  public department = "";  
  public maritalStatus = false; 
  public role = "";
  public notes = "";
  public index = "";
  

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    if (this.department == "Accounting") { 
        this.departments[0]["isChecked"] = true;
    }
    if (this.department == "Engineering") {
        this.departments[1]["isChecked"] = true;
    }
    if (this.department == "Human Resources") { 
        this.departments[2]["isChecked"] = true;
    }
    if (this.department == "Information Technology") { 
        this.departments[3]["isChecked"] = true;
    }
     
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
        this.arrayEmps[this.arrayEmps.length] = emp;
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
}