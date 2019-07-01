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

  public form = [
    { val: "IT", isChecked: false },
    { val: "Accounting", isChecked: false },
    { val: "Transportation", isChecked: false },
    { val: "Civil", isChecked: false },
    { val: "Telecom", isChecked: false },
    { val: "Architecture", isChecked: false }
  ];
  
  public name: any = this.navParams.data.value.employee_Name;
  public newCreate: any = this.navParams.data.bindFunction;
  public data;
  incidentTitle: any;
  date: any;
  category: any;
  public priority: any;
  public description: any;
  public id: any;

  constructor(private modalController: ModalController, private navParams: NavParams) {

  }

  ngOnInit() {
    console.log(this.form);

  }

  confirmCreate()
  {
    this.data = {"fullName": this.name, "incidentTitle": this.incidentTitle, "date": this.date, "category": this.category, "domain": this.form,  "priority": this.priority, "description": this.description,
    "status":"initiated"};
    this.newCreate(this.data);
    this.modalController.dismiss();
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

  



}
