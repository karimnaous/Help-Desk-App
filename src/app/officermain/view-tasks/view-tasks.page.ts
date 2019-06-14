import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

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
  private status: string;
  public splitted: string;
  //private id1: any = 0;

  // @Input() value: number;
   private id1: any = this.navParams.get('value');

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];


  constructor(public modalController: ModalController, public navParams: NavParams) {
    //const id1: string = this.navParams.get('value');
    this.retreivetask(this.id1);
   }

   public officer=JSON.parse(localStorage.getItem('officer'));
   public task=JSON.parse(localStorage.getItem('task'));
  
  async retreivetask(id: any)
  {
    this.username=this.task[id].username;
    this.priority=this.task[id].priority;
    this.splitted = this.task[id].date.split("T", 1);
    this.date= this.splitted[0];
    this.domain= this.task[id].domain;
    this.status= this.task[id].status;
  }

  async dismiss()
  {
    this.modalController.dismiss();
  }

  async start(id: any)
  {
    this.task[id].status="In Progress";
    localStorage.setItem('task', JSON.stringify(this.task));
    this.dismiss();
  }

  async resolve(id: any)
  {
    this.task[id].status="Resolved";
    localStorage.setItem('task', JSON.stringify(this.task));
    this.dismiss();
  }


  ngOnInit() {
  }

}
