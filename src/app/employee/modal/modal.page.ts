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
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];
  public newCreate: any = this.navParams.data.bindFunction;
  public data;
  name: any;
  incidentTitle: any;
  date: any;
  category: any;
  priority: any;
  public description: any;
  public id: any;

  constructor(private modalController: ModalController, private navParams: NavParams) {

  }

  ngOnInit() {
    console.log(this.form);

  }

  confirmCreate()
  {
    console.log(this.description);
    this.data = {"fullName": this.name, "incidentTitle": this.incidentTitle, "date": this.date, "category": this.category, "domain": this.form,  "priority": this.priority, "description": this.description};
    this.newCreate(this.data);
    this.modalController.dismiss();
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

  



}
