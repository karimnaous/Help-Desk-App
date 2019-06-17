import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  public name: any = this.navParams.data.valueName;
  public id: any = this.navParams.get("valueID");
  public inciName: any = this.navParams.get("valueIncidentTitle")
  public date: any = this.navParams.get("valueDate");
  public inciCat: any = this.navParams.get("valueCategory");
  public dom: any = this.navParams.get("valueDom");
  public prior: any =  this.navParams.get("valuePriority");
  public desc: any = this.navParams.get("valueDesc");

  constructor(private modalController: ModalController, public navParams: NavParams) {

  }

  ngOnInit() {
  }

  closeView() {
    this.modalController.dismiss();
  }


}
