import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { SecretaryPage } from '../secretary.page'
import { NavParams } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.page.html',
  styleUrls: ['./assign-modal.page.scss'],
})

export class AssignModalPage implements OnInit {
  public id: any;
  public array: any[];
  public priority:"";
  public date:"";
  public current_id:"";
  constructor(private router: Router,private modalController:ModalController,private navParams:NavParams,private alertController: AlertController, private Actionsheet: ActionSheetController) { 
    
    


  }
  ngOnInit() {
   this.id=this.navParams.get('id');
   console.log(this.id);
   this.array=this.getArray();
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

  async SaveRecord()
  {
    var current_record=JSON.parse(this.id);
    console.log(current_record);
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    console.log(localStorageItem);
    
    // var index=localStorageItem.indexOf(current_record);
    // console.log(index);
     current_record.priority=this.priority;
     current_record.date=this.date;
    // var newitem=temp;
    // console.log(newitem);
    // localStorageItem.splice(index,1,newitem);
    // window.localStorage.setItem("ObjArray", JSON.stringify(localStorageItem));

     this.modalController.dismiss(current_record);
  }
  ngOnDestroy() {
    // location.reload();
    
  } 
 
}
