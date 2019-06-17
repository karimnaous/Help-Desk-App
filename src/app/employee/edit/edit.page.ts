import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { analyzeAndValidateNgModules, ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
  public newName: any = this.navParams.get("Name");
  public otherId: any = this.navParams.get("ID");
  public newIncidentTitle: any = this.navParams.get("IncidentTitle")
  public newDate: any = this.navParams.get("Date");
  public newCategory: any = this.navParams.get("Category");
  public newDomain: any = this.navParams.get("Dom");
  public newPriority: any =  this.navParams.get("Priority");
  public newDesc: any = this.navParams.get("Desc");

 

  constructor(private modalController: ModalController, public navParams: NavParams) { }

  ngOnInit() {
  }

  saveEdit() {
    var checked = [];
    var arr = [];
    var index ;
    for (let entry of this.newform) {
      if (entry.isChecked == true) {
        checked.push(entry.valueM)
      }
    }
    var obj = { "id": this.otherId, "Full Name": this.newName, "Incident Title": this.newIncidentTitle, "Date": this.newDate, "Category": this.newCategory, "Domain": checked, "Priority": this.newPriority, "Description": this.newDesc }
    arr = JSON.parse(localStorage.getItem("Employees"));
    for (let i = 0 ; i < arr.length ; i++)
    {
      if (arr[i].id === this.otherId )
      {
        index = i;
        console.log(index);
      }
    }
    arr.splice(index, 1, obj);
    localStorage.setItem('Employees', JSON.stringify(arr));
    
    this.modalController.dismiss();
    
  }

  closeEdit() {
    this.modalController.dismiss();
  }

  public newform = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];

}
