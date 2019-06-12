import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { EditTaskPage } from '../officermain/edit-task/edit-task.page';
import { ViewTasksPage } from '../officermain/view-tasks/view-tasks.page';

@Component({
  selector: 'app-officermain',
  templateUrl: './officermain.page.html',
  styleUrls: ['./officermain.page.scss'],
})

export class OfficermainPage {

  constructor(public modalController: ModalController) { }
  
  async presentModalReassign(){
    const modal = await this.modalController.create({component: ModalPagePage});
    await modal.present();
  }

  async presentModalEdit(){
    const modal = await this.modalController.create({component: EditTaskPage});
    await modal.present();
  }

  async presentModalView(){
    const modal = await this.modalController.create({component: ViewTasksPage});
    await modal.present();
  }

}

