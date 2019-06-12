import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page'

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {

  public array: any[];
  public item1:any;
  public static mc:any;
  constructor(public modalController: ModalController) { 
    this.array=this.getArray();
    
    window.localStorage.setItem("ObjArray", JSON.stringify([
      {"id":1,"type":"txt1","priority":"low","date":"1/1/2009","name":"name1"},
      {"id":2,"type":"txt1","priority":"low","date":"1/1/2009","name":"name2"},
      {"id":3,"type":"txt1","priority":"low","date":"1/1/2009","name":"name3"}, 
      {"id":4,"type":"txt1","priority":"low","date":"1/1/2009","name":"name4"}
    ]))

  }

  ngOnInit() {
    SecretaryPage.mc=this.modalController;
  
  }
async assignModal()
{
  const modal= await this.modalController.create({
  component: AssignModalPage
  }
  );
  await modal.present();
}

 getArray(): Object[] {
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }
 

}
