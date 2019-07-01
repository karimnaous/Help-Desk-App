import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Router } from "@angular/router";

import * as _ from 'lodash';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.page.html',
  styleUrls: ['./view-modal.page.scss'],
})
export class ViewModalPage implements OnInit {
  public record: any;
  public array: any[];
  public priority: "";
  public date: "";
  public current_id: "";
  public emp: "";
  domain=  [
    { val: 'IT', isChecked: false },
    { val: 'Accounting', isChecked: false },
    { val: 'Transportation', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Telecom', isChecked: false },
    { val: 'Architecture', isChecked: false }
    ]; 
  public availableDomains:any[];


  constructor(private router: Router, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private Actionsheet: ActionSheetController) {
  }


  ngOnInit() {

    console.log(this.navParams);
    this.record = JSON.parse(this.navParams.data.recordItem);
    this.priority = this.record.incident_priority;
    this.date = this.record.incident_date;
    //this.domain = this.Domains2Form(this.record.domain);
    this.availableDomains=this.navParams.data.domains;
    this.emp=_.find(this.navParams.data.employees,{id:this.record.employee_id});
    
    this.domain=this.Domains2Form(this.record.Domains);
    console.log(this.domain);
 
  }
  close()
  {
    this.modalController.dismiss();
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

}
