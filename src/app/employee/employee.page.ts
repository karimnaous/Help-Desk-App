import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../Employee/modal/modal.page';
import { ViewPage } from '../Employee/view/view.page';
import { EditPage } from '../Employee/edit/edit.page';
import { Guid } from "guid-typescript";
import { viewAttached } from '@angular/core/src/render3/instructions';
import * as _ from 'lodash';


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


  tasks = [
  ];

  ngOnInit() {

    const me = this;
    me.tasks = JSON.parse(localStorage.getItem("Employees"));
    console.log('newTask', me.tasks);
  }

  saveEdit(task: any) {
    var checked = [];
    var arr = [];
    var index;
    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.valueM)
      }
    }
    var obj = { "id": task.id, "fullName": task.fullName, "indcidentTitle": task.incidentTitle, "date": task.date, "category": task.category, "domain": task.checked, "priority": task.priority, "Description": task.description }
    arr = JSON.parse(localStorage.getItem("Employees"));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === task.id) {
        index = i;
        console.log(index);
      }
    }
    arr.splice(index, 1, obj);
    localStorage.setItem('Employees', JSON.stringify(arr));

    this.modalController.dismiss();
  }

  saveData(task: any) {
    var checked = [];
    var arr = [];

    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.valueM)
      }
    }
    console.log(task);
    this.id = Guid.create();
    var obj = {
      "id": this.id.value,
      "fullName": task.fullName,
      "incidentTitle": task.incidentTitle,
      "date": task.date,
      "category": task.category,
      "domain": task.checked,
      "priority": task.priority,
      "description": task.description

    }

    console.log(obj);
    if (localStorage.length != 0) {
      arr = JSON.parse(localStorage.getItem("Employees"));
    }
    arr.push(obj);
   // this.tasks.push(obj);
    localStorage.setItem('Employees', JSON.stringify(arr));
    console.log(localStorage.getItem('Employees'));
    this.modalController.dismiss();
   // location.reload();

  }


  async openModal() {
    var bindCreate = this.saveData.bind(this);
    const modal = await this.modalController.create({ component: ModalPage, componentProps: {bindFunction: bindCreate} });
    modal.present();
  }

  async openView(returnedId: any) {
    const task = _.find(this.tasks, { id: returnedId });
    const view = await this.modalController.create({ component: ViewPage, componentProps: { value: task}});
    view.present();
  }

  async openEdit(returnedId: any) {
    var bindEdit = this.saveEdit.bind(this);
    const task = _.find(this.tasks, {id: returnedId});
    console.log(task);
    const edit = await this.modalController.create({ component: EditPage, componentProps: {value: task, bindedFunction: bindEdit} });
    edit.present();
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
