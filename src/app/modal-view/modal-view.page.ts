import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.page.html',
  styleUrls: ['./modal-view.page.scss'],
})
export class ModalViewPage implements OnInit {

  arrayEmps: [any];
  emp;
  ID;
  index : number;
  findEmployee; 
  readEmployeeBound;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.readEmployeeBound = this.navParams.data.readEmployee;
    this.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.findEmployee = this.navParams.data.findEmployee;
    this.index = this.findEmployee(this.ID);
    this.readEmployeeBound(this.arrayEmps[this.index]);
    this.emp = this.navParams.data.emp; 
  }

  async closeModal(edit:boolean) {
    const onClosedData = {clicked: edit, id: this.ID};
    await this.modalController.dismiss(onClosedData);
  }
}
