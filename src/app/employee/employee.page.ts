import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../Employee/modal/modal.page';
import { ViewPage } from '../Employee/view/view.page';
import { EditPage } from '../Employee/edit/edit.page';
import { viewAttached } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],

})
export class EmployeePage implements OnInit {


  constructor(private modalController: ModalController) { }
  name: any;
  incidentTitle: any;
  date: any;
  category: any;
  priority: any;
  desc: any;
  public dom: any;
  public id: any;

  public information = [
  ];

  ngOnInit() {


    var newEmployee = JSON.parse(localStorage.getItem("Employees"));
    for (let i = 0; i < newEmployee.length; i++) {
      this.name = newEmployee[i]["Full Name"];
      this.incidentTitle = newEmployee[i]["Incident Title"];
      this.date = newEmployee[i]["Date"];
      this.category = newEmployee[i]["Category"];
      this.dom = newEmployee[i]["Domain"];
      this.priority = newEmployee[i]["Priority"];
      this.desc = newEmployee[i]["Description"];
      this.id = newEmployee[i]["id"];
      this.information.push({ yourId: this.id, yourName: this.name, yourIncidentTitle: this.incidentTitle, yourDate: this.date, yourCategory: this.category, yourDom: this.dom, yourPrior: this.priority, yourDesc: this.desc });
    }
  }

  async openModal() {
    const modal = await this.modalController.create({ component: ModalPage });
    modal.present();
  }

  async openView(newId: any, newName: any, newInciTitle: any, newDate: any, newCategory: any, newDom: any, newPriority: any, newDesc: any) {
    const view = await this.modalController.create({ component: ViewPage, componentProps: {valueID: newId, valueName: newName, valueIncidentTitle: newInciTitle, valueDate: newDate, valueCategory: newCategory, valueDom: newDom, valuePriority: newPriority, valueDesc: newDesc }});
    view.present();
  }

  async openEdit(newId: any, newName: any, newInciTitle: any, newDate: any, newCategory: any, newDom: any, newPriority: any, newDesc: any) {
    const edit = await this.modalController.create({ component: EditPage, componentProps: {ID: newId, Name: newName, IncidentTitle: newInciTitle, Date: newDate, Category: newCategory, Dom: newDom, Priority: newPriority, Desc: newDesc}});
    edit.present();
  }


}
