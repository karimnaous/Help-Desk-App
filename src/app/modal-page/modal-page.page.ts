import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  private username: string;
  private priority: string;
  private date: string;
  private id1: any = 0;

  constructor(public modalController: ModalController, public alertController: AlertController) { 
    // localStorage.setItem('user1', JSON.stringify('Layal'));
    // localStorage.setItem('user2', JSON.stringify('Alex'));
    // localStorage.setItem('user3', JSON.stringify('Lynn'));
    // localStorage.setItem('user4', JSON.stringify('Tala'));
    
    this.retreivetask(this.id1);
  }

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];
  
  // public user1 = JSON.parse(localStorage.getItem('user1'));
  // public user2 = JSON.parse(localStorage.getItem('user2'));
  // public user3 = JSON.parse(localStorage.getItem('user3'));
  // public user4 = JSON.parse(localStorage.getItem('user4'));

  public officer=JSON.parse(localStorage.getItem('officer'));

  async savetask(id: any)
  {
    //var myObj;
    var checked =[];
    for (let entry of this.form)
    {
      if(entry.isChecked==true)
      {
        checked.push(entry.val);
      }
    }

    //myObj = {"username":this.username, "priority":this.priority, "date":this.date, "domain":checked};
    this.task[id].username = this.username;
    this.task[id].priority = this.priority;
    this.task[id].date = this.date;
    this.task[id].domain = checked;

    localStorage.removeItem('task');
    localStorage.setItem('task', JSON.stringify(this.task));
  }

  //public task1=JSON.parse(localStorage.getItem('task1'));
  public task=JSON.parse(localStorage.getItem('task'));
  
  async retreivetask(id: any)
  {
    this.username=this.officer[id].username;
    this.priority=this.task[id].priority;
    this.date= this.task[id].date;

    for(let entry of this.task[id].domain)
    {
      for(let entry1 of this.form)
      {
        if(entry==entry1.val)
        {
          entry1.isChecked=true;
        }
      }
    }
  }

  async dismiss()
  {
    this.modalController.dismiss();
  }


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Cancel',
      message: 'Are you sure you want to cancel your changes?',
      buttons: ['Yes', 'No']
    });

    return await alert.present();
  }


  ngOnInit() {
  }

}
