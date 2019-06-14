import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  public idYou: any;
  public name: any;
  public inciName: any;
  public date: any;
  public inciCat: any;
  public dom: any;
  public prior: any;
  public desc: any;

  constructor() { }

  ngOnInit() {
     var employee = JSON.parse(localStorage.getItem("Employees"));
     this.name = JSON.stringify(employee[0]["Full Name"]);
     this.inciName = JSON.stringify(employee[0]["Incident Title"]);
     this.date = JSON.stringify(employee[0]["Date"]);
     this.inciCat = JSON.stringify(employee[0]["Category"]);
     this.dom = JSON.stringify(employee[0]["Domain"]);
     this.prior = JSON.stringify(employee[0]["Priority"]);
     this.desc = JSON.stringify(employee[0]["Description"]);
     this.idYou = JSON.stringify(employee[0]["id"]);
  }
 
  
}
