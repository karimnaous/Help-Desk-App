import { Component, OnInit } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { namespaceHTML } from '@angular/core/src/render3';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],

})
export class ModalPage implements OnInit {

  name: string = "";
  incidentTitle: string = "";
  date: string = "";
  category: string = "";
  priority: string = "";
  desc: string = "";
  
  constructor() {


  }

  ngOnInit() {

  }

   saveData() {
     var checked = [];
     var arr = [];
     for(let entry of this.form)
     {
       if (entry.isChecked == true)
       {
         checked.push(entry.valueM)
       }
     }
     
    var obj =  {"Full Name": this.name, "Incident Title": this.incidentTitle, "Date": this.date, "Category": this.category, "Domain": checked, "Priority": this.priority, "Description": this.desc }
    arr.push(obj);
     
    localStorage.setItem('Employees', JSON.stringify(arr));
    // localStorage.setItem('Incidents', JSON.stringify({ "Incident Title": this.incidentTitle }));
    // localStorage.setItem('Dates', JSON.stringify({ "Date ": this.date }));
    // localStorage.setItem('Incident Category', JSON.stringify({ "Category ": this.category }));
    // localStorage.setItem('Domain', JSON.stringify({ "Domain ": checked}));
    // localStorage.setItem('Priority', JSON.stringify({ "Priority ": this.priority }));
    // localStorage.setItem('Description', JSON.stringify({ "Description ": this.desc }));

  }

  public form = [
    { valueM: "IT", isChecked: false },
    { valueM: "Accounting", isChecked: false },
    { valueM: "Transportation", isChecked: false },
    { valueM: "Architecture", isChecked: false },
    { valueM: "Telecom", isChecked: false }
  ];
  
   
  
}
