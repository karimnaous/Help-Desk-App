import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { SecretaryPage } from '../secretary.page'

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.page.html',
  styleUrls: ['./assign-modal.page.scss'],
})
export class AssignModalPage implements OnInit {

  public array: any[];
  public priority:"";
  constructor(private alertController: AlertController, private Actionsheet: ActionSheetController) { 
    this.array=this.getArray();


  }
  ngOnInit() {
  
  }
  getArray(): Object[] {
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }
  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Cancel',
      message: 'Are you sure you want to cancel? ',
      buttons: [
        {
          text:"No",
          role:'dontcancel',
          handler:()=>
          {
            console.log("closed");
            this.SaveRecord();

            
          }
        },        {
          text:"Yes",
          role:'cancel',
          handler:()=>
          {
            SecretaryPage.mc.dismiss();
            console.log("Cancelled");
            
          }
        }
      ]
    });
    return await alert.present();
  }

  SaveRecord()
  {
    if(this.priority==="")
    console.log("empty")
    else
    console.log(this.priority);
  }
 
}
