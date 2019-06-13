import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { ViewTasksPage } from '../officermain/view-tasks/view-tasks.page';

@Component({
  selector: 'app-officermain',
  templateUrl: './officermain.page.html',
  styleUrls: ['./officermain.page.scss'],
})

export class OfficermainPage {

  constructor(public modalController: ModalController) { 
    let officer = [
      {username:"Layal"},
      {username:"Alex"},
      {username:"Lynn"},
      {username:"Tala"},
      {username:"Karim"}
    ];

    localStorage.setItem('officer', JSON.stringify(officer));

    let task = [
      {id:"0", username:"Layal", priority:"High", date:"2019-06-13T11:14:12.880+03:00", domain:["Project Management","IT","Architecture"]},
      {id:"1", username:"Alex", priority:"Low", date:"2019-04-15T11:14:12.880+06:00", domain:["Mechanical","Architecture"]}
    ];

    localStorage.setItem('task', JSON.stringify(task));
  }

  public task=JSON.parse(localStorage.getItem('task'));
  
  async presentModalReassign(){
    const modal = await this.modalController.create({component: ModalPagePage});
    await modal.present();
  }

  async presentModalView(){
    const modal = await this.modalController.create({component: ViewTasksPage});
    await modal.present();
  }

}

