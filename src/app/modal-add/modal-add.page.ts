
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  arrayEmps: [any]; 

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
    private modalController: ModalController,  public toastController: ToastController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.emp.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.saveEmployees = this.navParams.data.saveEmployees;
  }

  async closeModal(save:boolean) {
    // const toast = await this.toastController.create({
    //   message: 'Added Employee.',
    //   duration: 2000
    // });
    if (save == true) {
        let married = "Single";
        if (this.emp.MaritalStatus) { married = "Married"; }
        this.emp.MaritalStatus = married;
        this.arrayEmps.push(this.emp);
        this.saveEmployees(this.arrayEmps);
        const onClosedData = null;
        await this.modalController.dismiss(onClosedData);
        // toast.present();
    }
    else {
        const onClosedData = null;
        await this.modalController.dismiss(onClosedData);
    }
  }

}