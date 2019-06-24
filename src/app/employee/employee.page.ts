import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../employee/modal/modal.page';
import { ViewPage } from '../employee/view/view.page';
import { EditPage } from '../employee/edit/edit.page';
import { Guid } from "guid-typescript";
import { ToastController } from '@ionic/angular';
import { viewAttached } from '@angular/core/src/render3/instructions';
import * as _ from 'lodash';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],

})
export class EmployeePage implements OnInit {


  constructor(private modalController: ModalController, public toastController: ToastController) { }
  name: any;
  incidentTitle: any;
  date: any;
  category: any;
  priority: any;
  description: any;
  public dom: any;
  public id: any;
  public saving: any;
  public form = [
    { val: "IT", isChecked: false },
    { val: "Accounting", isChecked: false },
    { val: "Transportation", isChecked: false },
    { val: "Civil", isChecked: false },
    { val: "Telecom", isChecked: false },
    { val: "Architecture", isChecked: false }
  ];
  tasks = [];

  ngOnInit() { 

    const me = this;
    this.tasks = [];
    var localStoragetask=localStorage.getItem("task")
    if (localStoragetask!==null) {
      me.tasks = JSON.parse(localStoragetask);
    }

    console.log('newTask', me.tasks);
  }

  saveEdit(task: any) {
    console.log(this.tasks);
    var checked = [];
    var arr = [];
    var index;
    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.val)
      }
    }

    this.name = task.fullName;
    this.incidentTitle = task.incidentTitle;
    this.date = task.date;
    this.category = task.category;
    this.priority = task.priority;
    this.description = task.description;

    var obj = {
      "id": task.id,
      "fullName": task.fullName,
      "incidentTitle": task.incidentTitle,
      "date": task.date,
      "category": task.category,
      "domain": task.domain,
      "priority": task.priority,
      "description": task.description,
      "status":"initiated"
    }
    
    arr = JSON.parse(localStorage.getItem("task"));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === task.id) {
        index = i;
      }
    }
    arr.splice(index, 1, obj);
    this.tasks = arr;
    localStorage.setItem('task', JSON.stringify(arr));

    this.presentToast("Task successfully edited.")
    this.closeModal()

  }

  saveData(task: any) {
    var checked = [];
    var arr = [];

    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.val)
      }
    }

    this.id = Guid.create();
    var obj = {
      "id": this.id.value,
      "fullName": task.fullName,
      "incidentTitle": task.incidentTitle,
      "date": task.date,
      "category": task.category,
      "domain": task.domain,
      "priority": task.priority,
      "description": task.description,
      "status":"initiated"
    }

    var localStoragetask=localStorage.getItem("task")
    if (localStoragetask!==null) {
      arr = JSON.parse(localStoragetask);
    }

    arr.push(obj);
    this.tasks=arr;


    localStorage.setItem('task', JSON.stringify(arr));

    this.presentToast("Task successfully saved.")
    this.closeModal();

  }


  async openModal() {
    var bindCreate = this.saveData.bind(this);
    const modal = await this.modalController.create({ component: ModalPage, componentProps: { bindFunction: bindCreate } });
    modal.present();
  }

  async openView(returnedId: any) {
    const task = _.find(this.tasks, { id: returnedId });
    const view = await this.modalController.create({ component: ViewPage, componentProps: { value: task } });
    view.present();
  }

  async openEdit(returnedId: any) {
    var bindEdit = this.saveEdit.bind(this);
    const task = _.find(this.tasks, { id: returnedId });
    const edit = await this.modalController.create({ component: EditPage, componentProps: { value: task, bindedFunction: bindEdit } });
    edit.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({ message: msg, duration: 1000 });
    toast.present();
  }
}
