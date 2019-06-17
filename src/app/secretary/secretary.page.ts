import { Component, OnInit, Input, EventEmitter, Pipe } from '@angular/core';

import { ModalController} from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page';

import * as uuidv1 from 'uuid/v1';
import * as _ from 'lodash';
import { ViewModalPage } from './view-modal/view-modal.page';


@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {
  @Input() recordItem: any;
  public array: any[];
  public devWidth = window.innerWidth;
  public final_record: any;
  constructor(public modalController: ModalController) {

    localStorage.setItem("ObjArray", JSON.stringify([
      {
        "id": uuidv1(), "type": "txt1", "priority": "high", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name1"
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "low", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name2"
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "mod", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name3"
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "low", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name4"
      }
    ]))
    this.array = this.getArray();
    

  }
  onResize(event) {
    this.devWidth=event.target.innerWidth;
    
  }

  ngOnInit() {
    
    

  }

  async assignModal(id) {
    var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == id));
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));

    let myEmitter = new EventEmitter<any>();
    myEmitter.subscribe(
      v => this.getfromModal(v)
    );
    const modal = await this.modalController.create({
      component: AssignModalPage,
      componentProps: { recordItem: record, theEmitter: myEmitter }
    }
    );

    await modal.present();
  }
  async viewModal(id) {
    var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == id));
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));

    const modal = await this.modalController.create({
      component: ViewModalPage,
      componentProps: { recordItem: record }
    }
    );

    await modal.present();
  }


  getArray(): Object[] {
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }

  getfromModal(record) {


    record = JSON.parse(record);
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
    var old_record = localStorageItem.find(x => x.id == record.id);
    var index = localStorageItem.indexOf(old_record);
    console.log(index);
    localStorageItem.splice(index, 1, record);
    window.localStorage.setItem("ObjArray", JSON.stringify(localStorageItem));
    this.array = this.getArray();


  }


}

