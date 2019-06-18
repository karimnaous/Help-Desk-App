import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams  } from '@ionic/angular';
import { analyzeAndValidateNgModules, ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  
  public newName: any = this.navParams.get("Name");
  public otherId: any = this.navParams.get("ID");
  public newIncidentTitle: any = this.navParams.get("IncidentTitle");
  public newDate: any = this.navParams.get("Date");
  public newCategory: any = this.navParams.get("Category");
  public newDomain: any = this.navParams.get("Dom");
  public newPriority: any =  this.navParams.get("Priority");
  public newDesc: any = this.navParams.get("Desc");
  public newSave: any = this.navParams.get("saveValue");


 

  constructor(private modalController: ModalController, public navParams: NavParams) { }

  ngOnInit() {
  }

  confirmSave()
  {
    this.newSave(this.otherId, this.newName, this.newIncidentTitle, this.newDate, this.newCategory, this.newDomain, this.newPriority, this.newDesc);
  }

  closeEdit() {
    this.modalController.dismiss();
  }

  public form = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];

}