import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../Employee/modal/modal.page';
import { ViewPage } from '../Employee/view/view.page';
import { EditPage } from '../Employee/edit/edit.page';
import { Guid } from "guid-typescript";
import { ToastController } from '@ionic/angular';
import { viewAttached } from '@angular/core/src/render3/instructions';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],

})
export class EmployeePage implements OnInit {


  constructor(private modalController: ModalController, public toastController: ToastController, public http: HttpClient) { }
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
  merged=[];

  tasks;
  employees;

  ngOnInit() {

    
    const me = this;
    this.tasks;
    this.employees;
    //var localStoragetask=localStorage.getItem("task")
    // if (localStoragetask!==null) {
    //   me.tasks = JSON.parse(localStoragetask);
    // }

    // console.log('newTask', me.tasks);
    
    this.http.get('https://localhost:44304/api/Incidents/GetAllIncidents')
    .toPromise()
    .then((Incidents)=>{
    console.log(Incidents);
     this.tasks=Incidents;
     this.http.get('https://localhost:44304/api/Employee/GetAllEmployees')
     .toPromise()
     .then((Employees)=>{
     console.log(Employees);
      this.employees=Employees;
      for (let i=0;i<this.tasks.length;i++)
      {
        var item=_.find(this.employees,{id:this.tasks[i].employee_id});
        var item2=this.tasks[i]
         item2['fullname']=item['fullname']
         this.merged.push(item2)
      }
   //_.merge(_.keyBy(this.tasks, 'employee_id'), _.keyBy(this.employees, 'id'));
     console.log(this.merged);
     }) }) 

        


  
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

    // this.name = task.fullName;
    // this.incidentTitle = task.incidentTitle;
    // this.date = task.date;
    // this.category = task.category;
    // this.priority = task.priority;
    // this.description = task.description;

    var obj = {
      "id": task.id,
      "title": task.title,
      "incident_date": task.incident_date,
      "category": task.category,
      "domain": task.domain,
      "incident_priority": task.incident_priority,
      "incident_description": task.incident_description,
      "incident_status":"initiated"
    }

    
    arr = JSON.parse(this.tasks);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === task.id) {
        index = i;
      }
    }

   


    arr.splice(index, 1, obj);
    this.http.get('https://localhost:44304/api/Incidents/PostIncidents[arr]')
    //this.tasks = arr;
    //localStorage.setItem('task', JSON.stringify(arr));

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
      "id": task.id,
      "id_emp": task.employee_id,
      "title": task.title,
      "incident_date": task.incident_date,
      "category": task.category,
      "domain": task.domain,
      "incident_priority": task.incident_priority,
      "incident_description": task.incident_description,
      "incident_status":"initiated"
    }
 
   // var localStoragetask=localStorage.getItem("task")
    if (this.tasks!==null) {
      arr = JSON.parse(this.tasks);
    }

    arr.push(obj);
    this.tasks=arr;


    //localStorage.setItem('task', JSON.stringify(arr));

    this.http.get('https://localhost:44304/api/Incidents/PostIncidents[arr]')

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
    const employee_name = _.find(this.employees, { id: task.employee_id });
    const view = await this.modalController.create({ component: ViewPage, componentProps: { value: task,employee_name:employee_name.fullname } });
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
