import { Component, OnInit,Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page'

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {
  @Input() id: any;
  public array: any[];
  public item1:any;
  public static mc:any;
  constructor(public modalController: ModalController) { 
  this.array=this.getArray();
  const uuidv1 = require('uuid/v1');

    window.localStorage.setItem("ObjArray", JSON.stringify([
      {"id":uuidv1(),"type":"txt1","priority":"low","date":"1/1/2009","name":"name1"},
      {"id":uuidv1(),"type":"txt1","priority":"low","date":"1/1/2009","name":"name2"},
      {"id":uuidv1(),"type":"txt1","priority":"low","date":"1/1/2009","name":"name3"}, 
      {"id":uuidv1(),"type":"txt1","priority":"low","date":"1/1/2009","name":"name4"}
    ]))

  }

  ngOnInit() {
    SecretaryPage.mc=this.modalController;
  
  }
async assignModal(event)
{
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var record=JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id === JSON.parse(value)));
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    const modal= await this.modalController.create({
  component: AssignModalPage,
  componentProps: {id: record}
  }
  );
  modal.onDidDismiss()
  .then((data) => {
        const current_record = data['data']; 
        console.log(current_record);
    });
  await modal.present();
}

 getArray(): Object[] {
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }
 

}
