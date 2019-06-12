import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { EditTaskPage } from '../officermain/edit-task/edit-task.page';
import { ListOfTasksPage } from '../officermain/list-of-tasks/list-of-tasks.page';
import { ViewTasksPage } from '../officermain/view-tasks/view-tasks.page';

@Component({
  selector: 'app-officermain',
  templateUrl: './officermain.page.html',
  styleUrls: ['./officermain.page.scss'],
})

export class OfficermainPage {

  constructor(public modalController: ModalController) { }
  
  async presentModal(){
    const modal = await this.modalController.create({component: ModalPagePage});
    await modal.present();
  }

  async presentModal1(){
    const modal = await this.modalController.create({component: EditTaskPage});
    await modal.present();
  }

  async presentModal3(){
    const modal = await this.modalController.create({component: ListOfTasksPage});
    await modal.present();
  }

  async presentModal2(){
    const modal = await this.modalController.create({component: ViewTasksPage});
    await modal.present();
  }

}

