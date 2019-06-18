import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Guid } from "guid-typescript";
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { namespaceHTML } from '@angular/core/src/render3';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],

})
export class ModalPage implements OnInit {

  public newCreate: any = this.navParams.data.bindFunction;
  public data;
  name: any;
  incidentTitle: any;
  date: any;
  category: any;
  priority: any;
  desc: any;
  public id: any;

  constructor(private modalController: ModalController, private navParams: NavParams) {

  }

  ngOnInit() {

  }

  confirmCreate()
  {
    this.data = {"fullName": this.name, "incidentTitle": this.incidentTitle, "date": this.date, "category": this.category, "priority": this.priority, "descriprion": this.desc};
    this.newCreate(this.data);
    this.modalController.dismiss();
  }
  // saveData() {
  //   var checked = [];
  //   var arr = [];

  //   for (let entry of this.form) {
  //     if (entry.isChecked == true) {
  //       checked.push(entry.valueM)
  //     }
  //   }
  //   this.id = Guid.create();
  //   var obj = { "id": this.id.value, "Full Name": this.name, "Incident Title": this.incidentTitle, "Date": this.date, "Category": this.category, "Domain": checked, "Priority": this.priority, "Description": this.desc }
  //   if (localStorage.length != 0) {
  //     arr = JSON.parse(localStorage.getItem("Employees"));
  //   }
  //   arr.push(obj)
  //   localStorage.setItem('Employees', JSON.stringify(arr));

  //   arr = []
  //   this.modalController.dismiss();
  //   location.reload();

  // }

  closeModal() {
    this.modalController.dismiss();
  }

  public form = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];



}
