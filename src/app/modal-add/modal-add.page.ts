
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})

export class ModalAddPage implements OnInit {


  // NavParams data and methods
  emp;
  arrayEmps: [any]; 
  saveEmployees;

  maritalStatus: false;


  constructor(
    private modalController: ModalController, public alertController: AlertController, public toastController: ToastController,
    private navParams: NavParams 
  ) { }


  ngOnInit() {
    this.emp = this.navParams.data.emp;
    this.emp.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.saveEmployees = this.navParams.data.saveEmployees;
  }


  async closeModal(save:boolean) {
    const toast = await this.toastController.create({ 
        message: 'Added Employee: ' + this.emp.Name, duration: 2000 });
    if (save == true) {
        let married = "Single";
        if (this.maritalStatus) { married = "Married"; }
        this.emp.MaritalStatus = married;
        this.arrayEmps.push(this.emp);
        this.saveEmployees(this.arrayEmps);
        toast.present();
    }
    const onClosedData = null;
    await this.modalController.dismiss(onClosedData);
  }


  edited = false;
  checkValue(event){ this.edited = true; }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'You have unsaved changes.',
      message: 'Are you sure you want to cancel?',
      buttons: [
        { text: 'Back', role: 'cancel', cssClass: 'secondary', }, 
        { text: 'Yes', handler: () => { this.closeModal(false); } }
      ]
    });
    if (this.edited == true) {
      await alert.present();
    }
    else {
        this.closeModal(false);
    }
  }


}