import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Router } from "@angular/router";

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


  constructor(private router: Router, private modalController: ModalController, private navParams: NavParams, private alertController: AlertController, private Actionsheet: ActionSheetController) {
  }

  ngOnInit() {

    console.log(this.navParams);
    this.record = JSON.parse(this.navParams.data.recordItem);
    this.priority = this.record.priority;
    this.date = this.record.date;
    this.emp = this.record.username;
    console.log(this.record.domain);
    this.domain = this.record.domain;
 
  }
  close()
  {
    this.modalController.dismiss();
  }

}
