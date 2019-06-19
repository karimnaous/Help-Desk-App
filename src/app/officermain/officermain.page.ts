import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../officermain/modal-page/modal-page.page';
import { ViewTasksPage } from '../officermain/view-tasks/view-tasks.page';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-officermain',
  templateUrl: './officermain.page.html',
  styleUrls: ['./officermain.page.scss'],
})

export class OfficermainPage {

  @ViewChild('sectionSelect') sectionSelect: any;
  doFilter(){
    this.sectionSelect.open();
 }

  constructor(public modalController: ModalController) {
    // let task = [
    //   {id: Guid.create()["value"], username:"Layal", priority:"High", date:"2019-06-13T11:14:12.880+03:00", domain:["Project Management","IT","Architecture"], "status":"Assigned"},
    //   {id: Guid.create()["value"], username:"Alex", priority:"Low", date:"2019-04-15T11:14:12.880+06:00", domain:["Mechanical","Architecture"], "status":"Assigned"},
    //   {id: Guid.create()["value"], username:"Layal", priority:"Medium", date:"2019-09-20T11:14:12.880+06:00", domain:["Civil","Architecture"], "status":"Assigned"}
    // ];

    // localStorage.setItem('task', JSON.stringify(task));

    // let myuser = {user: "Layal"};

    // localStorage.setItem('myuser', JSON.stringify(myuser));
  }

  savetask(id, username, priority, date, domain, comments) {

    this.task[id].username = username;
    this.task[id].priority = priority;
    this.task[id].date = date;
    this.task[id].domain = domain;
    this.task[id].comments = comments;

    localStorage.removeItem('task');
    localStorage.setItem('task', JSON.stringify(this.task));
  }


  resolve(id)
  {
    this.task[id].status="Resolved";
    localStorage.setItem('task', JSON.stringify(this.task));
    this.modalController.dismiss();

  }

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];
  
  public task = JSON.parse(localStorage.getItem('task'));
  private date: string;
  private username: string;
  private comments: string;

  public myuser = JSON.parse(localStorage.getItem('myuser'));
  private priority: string = "ViewAll";
  public task_filtered = this.data_filter();


  async presentModalReassign(id: any) {
    var sendFunc = this.savetask.bind(this);
    const modal = await this.modalController.create({ component: ModalPagePage, componentProps: { value: id, value1: sendFunc } });
    await modal.present();
  }

  async presentModalView(id: any) {
    var sendResolve = this.resolve.bind(this);
    const modal = await this.modalController.create({ component: ViewTasksPage, componentProps: { value: id, value1:sendResolve} });
    await modal.present();
  }

  data_filter() {
    if (this.priority == "ViewAll") {
      return this.task;
    }
    else {
      return this.task.filter(element => element.priority == this.priority);
    }
  }

  onChange() 
  {
    this.task_filtered = this.data_filter();
  }


  findTaskIndex(guid: any) 
  {
    var index = -1;
    for (let entry of this.task)
    {
      index++;
      if (entry.id == guid)
      {
        return index;
      }
    }

  }

}

