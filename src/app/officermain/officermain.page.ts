import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../officermain/modal-page/modal-page.page';
import { ViewTasksPage } from '../officermain/view-tasks/view-tasks.page';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-officermain',
  templateUrl: './officermain.page.html',
  styleUrls: ['./officermain.page.scss'],
})

export class OfficermainPage {


  constructor(public modalController: ModalController) {
    // let task = [
    //   {id: Guid.create()["value"], username:"Layal", priority:"High", date:"2019-06-13T11:14:12.880+03:00", domain:["Project Management","IT","Architecture"], "status":"Assigned"},
    //   {id: Guid.create()["value"], username:"Alex", priority:"Low", date:"2019-04-15T11:14:12.880+06:00", domain:["Mechanical","Architecture"], "status":"Assigned"},
    //   {id: Guid.create()["value"], username:"Layal", priority:"Medium", date:"2019-09-20T11:14:12.880+06:00", domain:["Civil","Architecture"], "status":"Assigned"}
    // ];

    // localStorage.setItem('task', JSON.stringify(task));

    // let myuser = {user: "Layal"};

    // localStorage.setItem('myuser', JSON.stringify(myuser));

  }

  // ngOnInit() {
  //   console.log('123');
  //   this.randomFunc()
  //   .then(function (ret) {
  //     console.log('1st', ret);
  //     this.randomFunc()
  //     .then(function(ret) {
  //       console.log('2nd', ret);
  //     });
  //   })
  //   .catch(function (err) {
  //     console.log('err', err);
  //   });
  //   console.log('321');
  // }

  public task = JSON.parse(localStorage.getItem('task'));

  public myuser = JSON.parse(localStorage.getItem('myuser'));
  private priority: string= "ViewAll";
  public task_filtered = this.data_filter();
 

  async presentModalReassign(id: any) {
    const modal = await this.modalController.create({ component: ModalPagePage, componentProps: { value: id } });
    await modal.present();
  }

  async presentModalView(id: any) {
    const modal = await this.modalController.create({ component: ViewTasksPage, componentProps: { value: id } });
    await modal.present();
  }

  data_filter(){
    if(this.priority=="ViewAll")
    {
      return this.task;
    }
    else{
    return this.task.filter( element => element.priority == this.priority);
    }
  } 

  onChange(){
      this.task_filtered = this.data_filter();
  }

  findTaskIndex(guid:any)
  {
    var index=-1;
   for(let entry of this.task)
   {
     index++;
     if (entry.id==guid)
     {
        return index;
     }
   }
   
}

}

