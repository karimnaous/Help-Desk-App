import { Component, OnInit,Input,EventEmitter  } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page'

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {
  @Input() recordItem: any;
  public array: any[];
  public item1:any;
  public final_record:any;
  constructor(public modalController: ModalController) { 
  
  const uuidv1 = require('uuid/v1');

    // window.localStorage.setItem("ObjArray", JSON.stringify([
    //   {"id":uuidv1(),"type":"txt1","priority":"high","date":"1/1/2009","name":"name1"},
    //   {"id":uuidv1(),"type":"txt1","priority":"low","date":"1/1/2009","name":"name2"},
    //   {"id":uuidv1(),"type":"txt1","priority":"mod","date":"1/1/2009","name":"name3"}, 
    //   {"id":uuidv1(),"type":"txt1","priority":"low","date":"1/1/2009","name":"name4"}
    // ]))
    this.array=this.getArray();
  }

  ngOnInit() {

  
  }
  async viewModal(form)
  {
    console.log(form.value.id);
  }
async assignModal(form)
{
    var record=JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == form.value.id));
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));

    let myEmitter = new EventEmitter< any >();
		myEmitter.subscribe(
			v=> console.log( `my emitter fired and returned a value of ${v}`)
		);
    const modal= await this.modalController.create({
  component: AssignModalPage,
  componentProps: {recordItem: record, theEmitter: myEmitter}
  }
  );

  await modal.present();
}

 getArray(): Object[] {
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }
 
  getfromModal(event) {
    this.final_record = event;
    console.log("hi",this.final_record);
  }

}
