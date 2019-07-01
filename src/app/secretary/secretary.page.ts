import { Component, OnInit, Input} from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';
import { AssignModalPage } from '../secretary/assign-modal/assign-modal.page';

import * as uuidv1 from 'uuid/v1';
import * as _ from 'lodash';
import { ViewModalPage } from './view-modal/view-modal.page';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {
  @Input() recordItem: any;
  @Input() employees_list: any;
  public incident_array: any;
  public officer_array: any[];
  
  public devWidth = window.innerWidth;
  public final_record: any;
  public domains: any;
  public switch_priority_order: boolean;
 
  constructor(public modalController: ModalController,public loadingController: LoadingController, public http: HttpClient,private toastController: ToastController) {


  }
  async ngOnInit() {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.switch_priority_order = false;
    this.http.get('https://localhost:44304/api/employees/getallemployees')
    .toPromise()
    .then((employees)=>{
      this.employees_list=employees;
      this.officer_array = _.filter(employees, { employee_role: "Officer" });
      this.http.get('https://localhost:44304/api/incidents/getallincidents')
      .toPromise()
      .then((incidents)=>{
        
      this.incident_array = _.filter(incidents,{incident_status:"initiated"});
      this.http.get('https://localhost:44304/api/Domains/GetAllDomains')
      .toPromise()
      .then((domains)=>{
        
        this.domains = domains;
        loading.dismiss();
  
      })

  
      })
    

    })


  }


  /**
   * Comparator for sorting in ascending order
   * @param a : Incident Object 1
   * @param b : Incident Object 2
   * 
   * used in sortbyascPriority() as a comparator in array.sort
   * 
   */
  priorityascComparator(a, b) {
    if (a.incident_priority === 'Low' || b.incident_priority === "High")
      return -1

    if (a.incident_priority === 'High' || b.incident_priority === "Low")
      return 1
    else return 0
  }

  /**
   * Comparator for sorting in descending order
   * @param a : Incident Object 1
   * @param b : Incident Object 2
   * used in sortbydescPriority() as a comparator in array.sort
   */
  prioritydescComparator(a, b) {
    if (a.incident_priority === 'Low' || b.incident_priority === "High")
      return 1
    if (a.incident_priority === 'High' || b.incident_priority === "Low")
      return -1
    else return 0
  }


  /**
   * Sorts by ascending order of priority when ion-chip Priority is clicked
   * and inverts switch_priority_order to sort by descending on 2nd click
   */
  sortbyascPriority() {
    this.switch_priority_order = !this.switch_priority_order;
    this.incident_array.sort((a, b) => this.priorityascComparator(a, b));
  }
  /**
    * Sorts by descending order of priority when ion-chip Priority is clicked
    * and inverts switch_priority_order to sort by ascending on 2nd click
    */
  sortbydescPriority() {
    this.switch_priority_order = !this.switch_priority_order;
    this.incident_array.sort((a, b) => this.prioritydescComparator(a, b));
  }

  /**
   * 
   * @param event: window resize event, sets the ngModel devWidth value
   * to new window size
   */
  onResize(event) {
    this.devWidth = event.target.innerWidth;
  }


  /**
   * This function opens the assign modal of the specific id
   * 
   * @param id : id of the incident object I want to open modal for
   * 
   * Sends the object having this id as a record as well as binded function
   * in componentProps
   */
  async assignModal(id) {
    var record = JSON.stringify(this.incident_array.find(x => x.id == id));
    var submit_removeFunc = this.savefromModal.bind(this);
    const modal = await this.modalController.create({
      component: AssignModalPage,
      componentProps: { recordItem: record, officer_list: this.officer_array, domains: this.domains,submitAndRemoveFunc: submit_removeFunc, }
    }
    );

    await modal.present();
  }

  /**
   * This function opens the view modal of the specific id
   * 
   * @param id : id of the incident object I want to open modal for
   * 
   * Sends the object having this id as a record in componentProps
   */
  async viewModal(id) {
    var record =JSON.stringify(this.incident_array.find(x => x.id == id));;
    const modal = await this.modalController.create({
      component: ViewModalPage,
      componentProps: { recordItem: record, domains: this.domains,employees:this.employees_list }
    }
    );

    await modal.present();
  }

  /**
   * This function will be binded and sent to modal to
   * save changes
   * @param record this record argument is given from modal page after change 
   * is made
   * 
   */
  async savefromModal(record) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      });
    headers.set("body",record);
    const options = {
      headers,
    };
    
    this.http.post('https://localhost:44304/api/Incidents/editIncident',
    record,options).toPromise().then(()=>
    this.http.get('https://localhost:44304/api/incidents/GetAllincidents')
    .toPromise()
    .then((incidents)=>{
      this.incident_array = _.filter(incidents,{incident_status:"initiated"});
      loading.dismiss();

    })
    )
       
  }





}

