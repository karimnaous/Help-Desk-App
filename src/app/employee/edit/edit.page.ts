import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams  } from '@ionic/angular';
import { analyzeAndValidateNgModules, ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
 
  public task: any = this.navParams.data.value;
  public newSave: any = this.navParams.data.bindedFunction;
  public otherId: any = this.navParams.data.value.id;
  public newName:  any = this.navParams.data.value.fullName;
  public newIncidentTitle: any = this.navParams.data.value.incidentTitle;
  public newDate: any = this.navParams.data.value.date;
  public newCategory: any =this.navParams.data.value.category;
  public newDomain: any = this.navParams.data.value.domain;
  public newPriority: any = this.navParams.data.value.priority;
  public newDesc: any = this.navParams.data.value.description;
  public editTasks;

  form = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];
  
  constructor(private modalController: ModalController, public navParams: NavParams) { }

  ngOnInit() {
    // console.log(this.task, this.otherName);
  }

  confirmSave()
  {
    this.editTasks = {"id": this.otherId, "fullName": this.newName, "incidentTitle": this.newIncidentTitle, "date": this.newDate, "category": this.newCategory, "domain": this.newDomain, "priority": this.newPriority, "descriprion": this.newDesc   };
    this.newSave(this.editTasks);
    this.modalController.dismiss();
  }

  closeEdit() {

    this.modalController.dismiss();
  }



}