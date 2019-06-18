import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController,ToastController } from '@ionic/angular';
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
  public incident_array: any[];
  public employee_array: any[];
  public priority: "";
  public date: "";
  public current_id: "";
  public emp: "";
  checkBoxList: any;

  private submit_and_delete: any;

  constructor(private toastController:ToastController,private router: Router, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private Actionsheet: ActionSheetController) {





  }
  ngOnInit() {

    this.record = JSON.parse(this.navParams.data.recordItem);
    this.priority = this.record.priority;
    this.date = this.record.date;
    this.emp = this.record.name;
    this.checkBoxList = JSON.parse(this.record.checkBoxList);
    this.submit_and_delete = this.navParams.data.submitAndRemoveFunc;
    this.employee_array=this.navParams.data.employees_list;
  }




/**
 * Cancel alert in case cancel is pressed and changes were made
 */
  async presentAlert() {

      const alert = await this.alertController.create({
      header: 'Cancel',
      message: 'Are you sure you want to cancel? ',
      buttons: [
        {
          text: "No",
          role: 'dontcancel',
          handler: () => {

          }
        }, {
          text: "Yes",
          role: 'cancel',
          handler: () => {
            this.modalController.dismiss();

          }
        }
      ]
    });
    var changedForm = (this.priority!== this.record.priority ||  JSON.stringify(this.date) !== JSON.stringify(this.record.date)
   || this.emp!==this.record.name || JSON.stringify(this.checkBoxList)!==JSON.stringify(JSON.parse(this.record.checkBoxList)));
    if (changedForm)
      return await alert.present();
    
   
    else return this.modalController.dismiss();
  }

/**
 * Calls binded function of secretary page using new record
 * as arguement
 */
  async doneEdit() {
    var current_record = this.record;
    current_record.priority = this.priority;
    current_record.date = this.date;
    current_record.checkBoxList = JSON.stringify(this.checkBoxList);
    current_record.name = this.emp;
    if(current_record.name===undefined)
    {
      const toast = await this.toastController.create({ message: 'Please Choose an Employee', duration: 5000 }); toast.present();

    }
    else{
    this.modalController.dismiss();
    this.submit_and_delete(current_record);
    }
  }



}
