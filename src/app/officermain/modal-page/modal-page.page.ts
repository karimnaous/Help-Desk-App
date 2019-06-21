import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  private username: string;
  private priority: string;
  private date: string;
  private change: boolean= false;
  private allChange1: boolean= false;
  private comments: string;
  officer;

  // @Input() value: number;
  private id1: any = this.navParams.get('value');
  private savetask1: any = this.navParams.get('value1');

  constructor(public toastController: ToastController, public modalController: ModalController, public alertController: AlertController, public navParams: NavParams) { 
    this.retreivetask(this.id1);
  }

  public form = [
    { val: 'IT', isChecked: false },
    { val: 'Accounting', isChecked: false },
    { val: 'Transportation', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Telecom', isChecked: false },
    { val: 'Architecture', isChecked: false }
  ];
  

  public checked = [];
  save(){
    for (let entry of this.form) {
      if (entry.isChecked == true) {
        this.checked.push(entry);
      }
    }
  }

  public task = JSON.parse(localStorage.getItem('task'));
  public user = JSON.parse(localStorage.getItem('myuser'));

  async savetaskReassign(id: any)
  {
    this.save();
    this.savetask1(id, this.username, this.priority, this.date, this.checked, this.comments);

    const toast = await this.toastController.create({
    message: 'Task reassigned successfully.',
    duration: 2000});
    toast.present();

    this.modalController.dismiss();
  }


  async savetaskEdit(id: any)
  {
    this.save();
    this.savetask1(id, this.username, this.priority, this.date, this.checked, this.comments);

    const toast = await this.toastController.create({
    message: 'Your edits have been saved.',
    duration: 2000});
    toast.present();

    this.modalController.dismiss();
  }
  
  async retreivetask(id: any)
  {
    this.username=this.task[id].username;
    this.priority=this.task[id].priority;
    this.date= this.task[id].date;
    this.comments= this.task[id].comments;
    this.form = this.task[id].domain;

  }

  async presentAlertConfirm() {
    if (this.allChange1 == true) {
    const alert = await this.alertController.create({
      header: 'Cancel',
      message: 'Are you sure you want to cancel your changes?',
      buttons: [
        {
          text: 'Yes',
          role: 'Yes',
          cssClass: 'secondary',
          handler: () => {
            this.modalController.dismiss();
          }
        }, {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });


    await alert.present();}
    else { this.modalController.dismiss();}
  }

  async onChange()
  {
    if (this.username==this.user.user)
    {
      this.change=false;
    }
    else {this.change=true;}
  }

  async allChange()
  {
      this.allChange1= true;
  }

  ngOnInit() {
    this.officer = JSON.parse(localStorage.getItem('Employees'));
    console.log('this.officer', this.officer);
  }
}
