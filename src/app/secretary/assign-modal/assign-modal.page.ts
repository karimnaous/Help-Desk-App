import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Router } from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.page.html',
  styleUrls: ['./assign-modal.page.scss'],
})

export class AssignModalPage implements OnInit {
  public record: any;
  public incident_array: any[];
  public officer_array: any[];
  public priority: "";
  public date: "";
  public current_id: "";
  public officer: "";
  public availableDomains;
  public domain;
  public domain_form;

  private submit_and_delete: any;

  constructor(private toastController: ToastController, private router: Router, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private Actionsheet: ActionSheetController) {





  }
  ngOnInit() {

    this.record = JSON.parse(this.navParams.data.recordItem);
    this.availableDomains = this.navParams.data.domains;
    this.priority = this.record.incident_priority;
    this.date = this.record.incident_date;
    this.domain = this.record.Domains;
    this.domain_form=this.Domains2Form(this.domain);
    this.submit_and_delete = this.navParams.data.submitAndRemoveFunc;
    this.officer_array = this.navParams.data.officer_list;


  }
  Domains2Form(domain):any {
    var formArray=[];
    for (let i = 0; i<this.availableDomains.length; i++) {

          if (_.find(domain,this.availableDomains[i])!== undefined) {
        formArray.push({val:this.availableDomains[i].domain_name,isChecked:true});
      }
      else formArray.push({val:this.availableDomains[i].domain_name,isChecked:false});
     
    }
    
    return formArray;

  }
  Form2Domain(form):any {
    var domainArray=[];
    for (let i = 0; i<form.length; i++) {
      if(form[i].isChecked){
      domainArray.push(_.find(this.availableDomains,{domain_name:form[i].val}));
      }
    }
    return domainArray;

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
    console.log(this.priority, this.record.priority, JSON.stringify(this.date), JSON.stringify(this.record.date), JSON.stringify(this.domain)
      , JSON.stringify(this.record.domain), this.officer, undefined)
    var changedForm = (this.priority !== this.record.priority || JSON.stringify(this.date) !== JSON.stringify(this.record.date)
      || JSON.stringify(this.domain) !== JSON.stringify(this.record.domain) || this.officer !== undefined);
    console.log(JSON.stringify(this.domain) === JSON.stringify(this.record.domain));

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
    current_record.incident_priority = this.priority;
    current_record.incident_date = this.date;
    current_record.Domains = this.Form2Domain(this.domain_form);
    current_record.officer_id = this.officer;
    current_record.incident_status = "Assigned";
    if (current_record.officer_id === undefined) {
      const toast = await this.toastController.create({ message: 'Please Choose an Employee', 
      duration: 2000 }); toast.present();

    }
    else {
      this.modalController.dismiss();
      this.submit_and_delete(current_record);
    }
  }



}
