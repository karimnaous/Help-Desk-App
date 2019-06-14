import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public newName: any;
  public otherId: any;
  public newIncidentTitle: any;
  public newDate: any;
  public newCategory: any;
  public newDomain: any;
  public newPriority: any;
  public newDesc: any; 

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    var employee = JSON.parse(localStorage.getItem("Employees"));
    this.otherId = JSON.stringify(employee[0]["id"]);
    this.newName = JSON.stringify(employee[0]["Full Name"]);
    this.newIncidentTitle = JSON.stringify(employee[0]["Incident Title"]);
    this.newDate = JSON.stringify(employee[0]["Date"]);
    this.newCategory = JSON.stringify(employee[0]["Category"]);
    this.newDomain = JSON.stringify(employee[0]["Domain"]);
    this.newPriority = JSON.stringify(employee[0]["Priority"]);
    this.newDesc = JSON.stringify(employee[0]["Description"]);
  }

  saveEdit() {
    var checked = [];
    var arr = [];

    for (let entry of this.newform) {
      if (entry.isChecked == true) {
        checked.push(entry.valueM)
      }
    }
    var obj = { "id": this.otherId, "Full Name": this.newName, "Incident Title": this.newIncidentTitle, "Date": this.newDate, "Category": this.newCategory, "Domain": checked, "Priority": this.newPriority, "Description": this.newDesc }
    arr.push(obj);
    localStorage.setItem('Employees', JSON.stringify(arr));

    this.modalController.dismiss();
  }

  closeEdit() {
    this.modalController.dismiss();
  }

  public newform = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];

}
