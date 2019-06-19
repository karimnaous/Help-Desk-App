import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // public name: any = this.navParams.data.valueName;
  public id: any = this.navParams.data.value.id;
  public name: any = this.navParams.data.value.fullName;
  public inciName: any = this.navParams.data.value.incidentTitle;
  public date: any = this.navParams.data.value.date;
  public inciCat: any = this.navParams.data.value.category;
  public dom: any = this.navParams.data.value.domain;
  public prior: any = this.navParams.data.value.priority;
  public desc: any = this.navParams.data.value.description;

  constructor(private modalController: ModalController, public navParams: NavParams) {
  }

  ngOnInit() {
    console.log(this.dom)
  }

  closeView() {
    this.modalController.dismiss();
  }


}
