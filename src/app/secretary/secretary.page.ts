import { Component, OnInit, Input, EventEmitter, Pipe } from '@angular/core';

import { ModalController , ToastController } from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page';

import * as uuidv1 from 'uuid/v1';
import * as _ from 'lodash';
import { ViewModalPage } from './view-modal/view-modal.page';
import { defaultComparator } from '@angular/common/src/pipes/keyvalue_pipe';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {
  @Input() recordItem: any;
  @Input() employees_list: any;
  public incident_array: any[];
  public employee_array: any[];
  public devWidth = window.innerWidth;
  public final_record: any;
  public switch_priority_order: boolean;

  constructor(public modalController: ModalController,private toastController: ToastController) {
    this.switch_priority_order=false;
    localStorage.setItem("ObjArray", JSON.stringify([
      {
        "id": uuidv1(), "type": "txt1", "priority": "high", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]'
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


    // localStorage.setItem("EmployeeArray", JSON.stringify([{
    //   "id": uuidv1(), "name": "name1"

    // }, {
    //   "id": uuidv1(), "name": "name2"

    // }, {
    //   "id": uuidv1(), "name": "name3"

    // }, {
    //   "id": uuidv1(), "name": "name4"

    // }
    //   , {
    //   "id": uuidv1(), "name": "name5"

    // }]));
    this.incident_array = this.getIncidentArray();

    this.employee_array = this.getEmployeeArray();
    //console.log(_.groupBy(this.incident_array, this.groupbyPriority));

  }

  priorityascComparator(a, b) {
    if (a === 'low' || b === "high")
      return -1

    if (a === 'high' || b === "low")
      return 1
    else return 0
  }
  prioritydescComparator(a, b) {
    if (a === 'low' || b === "high")
      return 1
    if (a === 'high' || b === "low")
      return -1
    else return 0
  }
  sortbyascPriority()
  {
    this.switch_priority_order=!this.switch_priority_order;
    this.incident_array.sort((a, b) => this.priorityascComparator(a.priority, b.priority));
  }
  sortbydescPriority()
  {
    this.switch_priority_order=!this.switch_priority_order;
    this.incident_array.sort((a, b) => this.prioritydescComparator(a.priority, b.priority));
  }


onResize(event) {
  this.devWidth = event.target.innerWidth;

}

ngOnInit() {



}

async assignModal(id) {
  var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == id));
  var submit_removeFunc=this.savefromModal.bind(this);
  const modal = await this.modalController.create({
    component: AssignModalPage,
    componentProps: { recordItem: record, employees_list: this.employee_array, submitAndRemoveFunc: submit_removeFunc, }
  }
  );

  await modal.present();
}
async viewModal(id) {
  var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == id));
  const modal = await this.modalController.create({
    component: ViewModalPage,
    componentProps: { recordItem: record }
  }
  );

  await modal.present();
}


getIncidentArray(): Object[] {
  var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
  return localStorageItem;

}
getEmployeeArray(): Object[] {
  var employees = JSON.parse(localStorage.getItem("EmployeeArray"));
  return employees;
}

async savefromModal(record) {
  console.log(record);
  var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
  var old_record = localStorageItem.find(x => x.id == record.id);
  var index = localStorageItem.indexOf(old_record);
  localStorageItem.splice(index, 1);
  window.localStorage.setItem("ObjArray", JSON.stringify(localStorageItem));
  this.incident_array = this.getIncidentArray();
  const toast = await this.toastController.create({ message: 'Submitted Successfully', duration: 2000 }); toast.present();
  
}





}

