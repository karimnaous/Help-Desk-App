import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.page.html',
  styleUrls: ['./modal-admin.page.scss'],
})
export class ModalAdminPage implements OnInit {

  arrayEmps: [any];
 
  emp;

  maritalStatus;
  ID;
  index : number;
  
  findEmployee; 
  readEmployeeBound;
  // saveEmployee;
  saveEmployees;

  constructor(
    private modalController: ModalController, public toastController: ToastController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.readEmployeeBound = this.navParams.data.readEmployee;
    this.ID = this.navParams.data.ID;
    this.arrayEmps = this.navParams.data.arrayEmps;
    this.findEmployee = this.navParams.data.findEmployee;
    // this.saveEmployee = this.navParams.data.saveEmployee;
    this.saveEmployees = this.navParams.data.saveEmployees;
    this.maritalStatus = this.navParams.data.maritalStatus;
    this.index = this.findEmployee(this.ID);
    this.readEmployeeBound(this.arrayEmps[this.index]);
    this.emp = this.navParams.data.emp;
  }

  async closeModal(save:boolean) {
    const toast = await this.toastController.create({
      message: 'Employee details updated.',
      duration: 2000
    });
    if (save == true) {
        let married = "Single";
        if (this.maritalStatus == true) { married = "Married"; }
        this.emp.MaritalStatus = married;
        this.arrayEmps[this.index] = this.emp;
        this.saveEmployees(this.arrayEmps);
        const onClosedData = null;
        toast.present();
        await this.modalController.dismiss(onClosedData);
    }
    else {
        const onClosedData = null;;
        await this.modalController.dismiss(onClosedData);
    }
  }

}
