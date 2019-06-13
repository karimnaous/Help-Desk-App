import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
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
  public record: any;
  public array: any[];
  public priority:"";
  public date:"";
  public current_id:"";
  
	private _anEmitter: EventEmitter< any >;

  @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private router: Router,private modalController:ModalController,private navParams:NavParams,private alertController: AlertController, private Actionsheet: ActionSheetController) { 
    
    


  }
  ngOnInit() {

   console.log(this.navParams);
   this.record=JSON.parse(this.navParams.data.recordItem);
   this.priority=this.record.priority;
   this._anEmitter = this.navParams.data.theEmitter;
   console.log(this._anEmitter);
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
            this.modalController.dismiss();
            console.log("Cancelled");
            
          }
        }
      ]
    });
    return await alert.present();
  }

  async SaveRecord()
  {
    var current_record=this.record;
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
      
     this.myEventAction(JSON.stringify(current_record));
     this.modalController.dismiss();
  }
  private myEventAction( somePassedArg: any ) {
		this._anEmitter.emit( somePassedArg );
	}
  ngOnDestroy() {
    // location.reload();
    
  } 
 
}
