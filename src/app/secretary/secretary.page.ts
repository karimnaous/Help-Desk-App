import { Component, OnInit, Input, EventEmitter, Pipe } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';
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

  constructor(public modalController: ModalController, private toastController: ToastController) {

    localStorage.setItem("ObjArray", JSON.stringify([
      {
        "id": uuidv1(), "type": "txt1", "priority": "high", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]'
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "low", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]'
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "mod", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]'
      },
      {
        "id": uuidv1(), "type": "txt1", "priority": "low", "date": "2007-01-01T00:00:00+02:00", "checkBoxList":
          '[{ "value":"Transportation", "isChecked":"true"},{"value":"IT","isChecked":"false"},{"value":"Civil","isChecked":"false"},{"value":"Engineering","isChecked":"false"},{"value":"Accounting","isChecked":"false"}]'
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

    //console.log(_.groupBy(this.incident_array, this.groupbyPriority));

  }
  ngOnInit() {
    this.incident_array = this.getIncidentArray();
    this.employee_array = this.getEmployeeArray();
    this.switch_priority_order = false;
  }



  /**
   * Comparator for sorting in ascending order
   * @param a : Incident Object 1
   * @param b : Incident Object 2
   * 
   * used in sortbyascPriority() as a comparator in array.sort
   * 
   */
  priorityascComparator(a, b) {
    if (a === 'low' || b === "high")
      return -1

    if (a === 'high' || b === "low")
      return 1
    else return 0
  }

  /**
   * Comparator for sorting in descending order
   * @param a : Incident Object 1
   * @param b : Incident Object 2
   * used in sortbydescPriority() as a comparator in array.sort
   */
  prioritydescComparator(a, b) {
    if (a === 'low' || b === "high")
      return 1
    if (a === 'high' || b === "low")
      return -1
    else return 0
  }


  /**
   * Sorts by ascending order of priority when ion-chip Priority is clicked
   * and inverts switch_priority_order to sort by descending on 2nd click
   */
  sortbyascPriority() {
    this.switch_priority_order = !this.switch_priority_order;
    this.incident_array.sort((a, b) => this.priorityascComparator(a.priority, b.priority));
  }
  /**
    * Sorts by descending order of priority when ion-chip Priority is clicked
    * and inverts switch_priority_order to sort by ascending on 2nd click
    */
  sortbydescPriority() {
    this.switch_priority_order = !this.switch_priority_order;
    this.incident_array.sort((a, b) => this.prioritydescComparator(a.priority, b.priority));
  }

  /**
   * 
   * @param event: window resize event, sets the ngModel devWidth value
   * to new window size
   */
  onResize(event) {
    this.devWidth = event.target.innerWidth;
  }


  /**
   * This function opens the assign modal of the specific id
   * 
   * @param id : id of the incident object I want to open modal for
   * 
   * Sends the object having this id as a record as well as binded function
   * in componentProps
   */
  async assignModal(id) {
    var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == id));
    var submit_removeFunc = this.savefromModal.bind(this);
    const modal = await this.modalController.create({
      component: AssignModalPage,
      componentProps: { recordItem: record, employees_list: this.employee_array, submitAndRemoveFunc: submit_removeFunc, }
    }
    );

    await modal.present();
  }

  /**
   * This function opens the view modal of the specific id
   * 
   * @param id : id of the incident object I want to open modal for
   * 
   * Sends the object having this id as a record in componentProps
   */
  async viewModal(id) {
    var record = JSON.stringify(JSON.parse(localStorage.getItem("ObjArray")).find(x => x.id == id));
    const modal = await this.modalController.create({
      component: ViewModalPage,
      componentProps: { recordItem: record }
    }
    );

    await modal.present();
  }


  /**
   * gets incident array from local storage
   * 
   */
  getIncidentArray(): Object[] {
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }
  /**
   * gets employee array from local storage
   */
  getEmployeeArray(): Object[] {
    var employees = JSON.parse(localStorage.getItem("EmployeeArray"));
    return employees;
  }

  /**
   * This function will be binded and sent to modal to
   * save changes
   * @param record this record argument is given from modal page after change 
   * is made
   */
  async savefromModal(record) {
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
    var old_record = localStorageItem.find(x => x.id == record.id);
    var index = localStorageItem.indexOf(old_record);
    localStorageItem.splice(index, 1);
    window.localStorage.setItem("ObjArray", JSON.stringify(localStorageItem));
    this.incident_array = this.getIncidentArray();
    const toast = await this.toastController.create({ message: 'Submitted Successfully', duration: 2000 }); toast.present();

  }





}

