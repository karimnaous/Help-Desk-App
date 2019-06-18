import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../Employee/modal/modal.page';
import { ViewPage } from '../Employee/view/view.page';
import { EditPage } from '../Employee/edit/edit.page';
import { Guid } from "guid-typescript";
import { viewAttached } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],

})
export class EmployeePage implements OnInit {


  constructor(private modalController: ModalController, ) { }
  name: any;
  incidentTitle: any;
  date: any;
  category: any;
  priority: any;
  desc: any;
  public dom: any;
  public id: any;
  public saving: any;
  

  public information = [
  ];

  ngOnInit() {


    var newEmployee = JSON.parse(localStorage.getItem("Employees"));
    for (let i = 0; i < newEmployee.length; i++) {
      this.name = newEmployee[i]["Full Name"];
      this.incidentTitle = newEmployee[i]["Incident Title"];
      this.date = newEmployee[i]["Date"];
      this.category = newEmployee[i]["Category"];
      this.dom = newEmployee[i]["Domain"];
      this.priority = newEmployee[i]["Priority"];
      this.desc = newEmployee[i]["Description"];
      this.id = newEmployee[i]["id"];
      this.information.push({ yourId: this.id, yourName: this.name, yourIncidentTitle: this.incidentTitle, yourDate: this.date, yourCategory: this.category, yourDom: this.dom, yourPrior: this.priority, yourDesc: this.desc });
    }
    
    this.saving = {

      saveEdit: function(id, name, incidentTitle, date, category, dom, priority, desc)
      {
        var checked = [];
      var arr = [];
      var index;
      for (let entry of this.form) {
        if (entry.isChecked == true) {
          checked.push(entry.valueM)
        }
      }
      var saved  =this.saving.saveEdit.bind()
      var obj = { "id": id, "Full Name": name, "Incident Title": incidentTitle, "Date": date, "Category": category, "Domain": checked, "Priority": priority, "Description": desc }
      arr = JSON.parse(localStorage.getItem("Employees"));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.otherId) {
          index = i;
          console.log(index);
        }
      }
      arr.splice(index, 1, obj);
      localStorage.setItem('Employees', JSON.stringify(arr));
  
      this.modalController.dismiss();
      }
    }
  
  }

  
  async openModal() {
    const modal = await this.modalController.create({ component: ModalPage });
    modal.present();
  }

  async openView(newId: any, newName: any, newInciTitle: any, newDate: any, newCategory: any, newDom: any, newPriority: any, newDesc: any) {
    const view = await this.modalController.create({ component: ViewPage, componentProps: { valueID: newId, valueName: newName, valueIncidentTitle: newInciTitle, valueDate: newDate, valueCategory: newCategory, valueDom: newDom, valuePriority: newPriority, valueDesc: newDesc } });
    view.present();
  }

  async openEdit(newId: any, newName: any, newInciTitle: any, newDate: any, newCategory: any, newDom: any, newPriority: any, newDesc: any) {
    const edit = await this.modalController.create({ component: EditPage, componentProps: { ID: newId, Name: newName, IncidentTitle: newInciTitle, Date: newDate, Category: newCategory, Dom: newDom, Priority: newPriority, Desc: newDesc, saveValue: this.saving.saveEdit.bind(this) } });
    edit.present();
  }

  saveData() {
    var checked = [];
    var arr = [];

    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.valueM)
      }
    }
    this.id = Guid.create();
    var obj = { "id": this.id.value, "Full Name": this.name, "Incident Title": this.incidentTitle, "Date": this.date, "Category": this.category, "Domain": checked, "Priority": this.priority, "Description": this.desc }
    if (localStorage.length != 0) {
      arr = JSON.parse(localStorage.getItem("Employees"));
    }
    arr.push(obj)
    localStorage.setItem('Employees', JSON.stringify(arr));

    arr = []
    this.modalController.dismiss();
    location.reload();

  }

  closeModal() {
    this.modalController.dismiss();
  }


  // saveEdit() {
  //   var checked = [];
  //   var arr = [];
  //   var index;
  //   for (let entry of this.form) {
  //     if (entry.isChecked == true) {
  //       checked.push(entry.valueM)
  //     }
  //   }
  //   var obj = { "id": this.otherId, "Full Name": this.newName, "Incident Title": this.newIncidentTitle, "Date": this.newDate, "Category": this.newCategory, "Domain": checked, "Priority": this.newPriority, "Description": this.newDesc }
  //   arr = JSON.parse(localStorage.getItem("Employees"));
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].id === this.otherId) {
  //       index = i;
  //       console.log(index);
  //     }
  //   }
  //   arr.splice(index, 1, obj);
  //   localStorage.setItem('Employees', JSON.stringify(arr));

  //   this.modalController.dismiss();

  // }

  public form = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];

  // var person = {  
  //   name: "James Smith",
  //   hello: function(thing) {
  //     console.log(this.name + " says hello " + thing);
  //   }
  // }

  // person.hello("world");  // output: "James Smith says hello world"
  // var helloFunc = person.hello.bind({ name: "Jim Smith" });
  // helloFunc("world");  // output: Jim Smith says hello world"


}
