import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';

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

}

