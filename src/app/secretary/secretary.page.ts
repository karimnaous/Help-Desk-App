import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page';
import * as uuidv1 from 'uuid/v1';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {
  @Input() recordItem: any;
  public array: any[];
  public final_record: any;
  constructor(public modalController: ModalController) {

    localStorage.setItem("ObjArray", JSON.stringify([
      {
        "id": uuidv1(), "type": "txt1", "priority": "high", "date": "1/1/2009", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name1"
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "low", "date": "1/1/2009", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name2"
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "mod", "date": "1/1/2009", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name3"
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "low", "date": "1/1/2009", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]',
        "name": "name4"
      }
    ]))
    this.array = this.getArray();

  }

  ngOnInit() {
    


  }
  async viewModal(form) {
    console.log(form.value.id);
  }
  async assignModal(form) {
    var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == form.value.id));
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
