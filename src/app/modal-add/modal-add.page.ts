
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  arrayEmps: [any]; 
  maritalStatus: false;

  emp = {
    ID : "",
    Name : "", 
    Gender : "", 
    Birthdate : "",
    Department : "",  
    MaritalStatus : "", 
    Role : "",
    Notes : "",
  }

  // Bound methods
  saveEmployees;

  constructor(
    private modalController: ModalController, public alertController: AlertController, public toastController: ToastController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.emp.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.saveEmployees = this.navParams.data.saveEmployees;
  }

  async closeModal(save:boolean) {
    const toast = await this.toastController.create({
      message: 'Added Employee.',
      duration: 2000
    });
    if (save == true) {
        let married = "Single";
        if (this.maritalStatus) { married = "Married"; }
        this.emp.MaritalStatus = married;
        this.arrayEmps.push(this.emp);
        this.saveEmployees(this.arrayEmps);
        const onClosedData = null;
        await this.modalController.dismiss(onClosedData);
        toast.present();
    }
    else {
        const onClosedData = null;
        console.log('hello');
        await this.modalController.dismiss(onClosedData);
    }
  }

  changed = false;
  checkValue(event){ this.changed = true; }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'You have unsaved changes.',
      message: 'Are you sure you want to cancel?',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.closeModal(false);
          }
        }
      ]
    });
    if (this.changed == true) {
      await alert.present();
    }
    else {
        this.closeModal(false);
    }
  }
}