import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  private ID: string;
  public splitted: string;
  //private id1: any = 0;

  // @Input() value: number;
   private id1: any = this.navParams.get('value');
   private resolve1: any = this.navParams.get('value1');

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];


  constructor(public toastController: ToastController, public modalController: ModalController, public navParams: NavParams) {
    //const id1: string = this.navParams.get('value');
    this.retreivetask(this.id1);
   }

   public officer=JSON.parse(localStorage.getItem('officer'));
   public task=JSON.parse(localStorage.getItem('task'));
  
  async retreivetask(id: any)
  {
    this.ID=this.task[id].id;
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

    const toast = await this.toastController.create({
    message: 'Task started successfully.',
    duration: 2000});
    toast.present();
      
  }

  async resolve(id: any)
  {
    this.resolve1(id);

    const toast = await this.toastController.create({
    message: 'Task resolved successfully.',
    duration: 2000});
    toast.present();
  }


  ngOnInit() {
  }


  
}
