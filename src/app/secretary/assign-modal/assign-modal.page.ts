import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { SecretaryPage } from '../secretary.page'
import { NavParams } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.page.html',
  styleUrls: ['./assign-modal.page.scss'],
})

export class AssignModalPage implements OnInit {
  public record: any;
  public array: any[];
  public priority: "";
  public date: "";
  public current_id: "";
  public emp: "";
  checkBoxList: any;

  private _anEmitter: EventEmitter<any>;

  @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private router: Router, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private Actionsheet: ActionSheetController) {





  }
  ngOnInit() {

    console.log(this.navParams);
    this.record = JSON.parse(this.navParams.data.recordItem);
    this.priority = this.record.priority;
    this.date = this.record.date;
    this.emp = this.record.name;
    console.log(this.record.checkBoxList);
    this.checkBoxList = JSON.parse(this.record.checkBoxList);
    this._anEmitter = this.navParams.data.theEmitter;
    console.log(this._anEmitter);
    this.array = this.getArray();
  }
  getArray(): Object[] {
    var localStorageItem = JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }


  checkEvent() {
    console.log(this.checkBoxList);
  }

  async presentAlert() {

      const alert = await this.alertController.create({
      header: 'Cancel',
      message: 'Are you sure you want to cancel? ',
      buttons: [
        {
          text: "No",
          role: 'dontcancel',
          handler: () => {
            console.log("closed");



          }
        }, {
          text: "Yes",
          role: 'cancel',
          handler: () => {
            this.modalController.dismiss();
            console.log("Cancelled");

          }
        }
      ]
    });
    console.log(this.priority,this.record.priority , this.date,this.record.date , JSON.stringify(this.checkBoxList),this.record.checkBoxList, this.emp,this.record.name);
    if (this.priority!== this.record.priority || this.date!==this.record.date 
      || JSON.stringify(this.checkBoxList)!==this.record.checkBoxList || this.emp!==this.record.name)
    return await alert.present();
    else return this.modalController.dismiss();
  }

  async SaveRecord() {
    var current_record = this.record;
    current_record.priority = this.priority;
    current_record.date = this.date;
    current_record.checkBoxList = JSON.stringify(this.checkBoxList);
    current_record.name = this.emp;


    this.myEventAction(JSON.stringify(current_record));
    this.modalController.dismiss();
  }
  private myEventAction(somePassedArg: any) {
    this._anEmitter.emit(somePassedArg);
  }



}
