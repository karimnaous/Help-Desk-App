import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.page.html',
  styleUrls: ['./view-tasks.page.scss'],
})
export class ViewTasksPage implements OnInit {

  private username: string;
  private priority: string;
  private date: string;
  private domain: string;
  public splitted: string;
  private id1: any = 0;

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];


  constructor(public modalController: ModalController) {
  this.retreivetask(this.id1);
   }

   public officer=JSON.parse(localStorage.getItem('officer'));
   public task=JSON.parse(localStorage.getItem('task'));
  
  async retreivetask(id: any)
  {
    this.username=this.officer[id].username;
    this.priority=this.task[id].priority;
    this.splitted = this.task[id].date.split("T", 1);
    this.date= this.splitted[0];
    this.domain= this.task[id].domain;
  }



 // async resolvetask(id1: any)
 // {

 // }


  ngOnInit() {
  }

}
