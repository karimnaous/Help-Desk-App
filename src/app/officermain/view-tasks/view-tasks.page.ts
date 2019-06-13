import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.page.html',
  styleUrls: ['./view-tasks.page.scss'],
})
export class ViewTasksPage implements OnInit {

  private username: string;
  private priority: string;
  private date: string;
  public splitted: string;

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];


  constructor(public modalController: ModalController) {
  this.retreivetask();
   }

  public task1=JSON.parse(localStorage.getItem('task1'));
  
  async retreivetask()
  {
    this.username=this.task1.username;
    this.priority=this.task1.priority;
    this.date= this.task1.date;

    var splitted = this.task1.date.split("T", 1); 
    this.splitted= splitted[0];

    for(let entry of this.task1.domain)
    {
      for(let entry1 of this.form)
      {
        if(entry==entry1.val)
        {
          entry1.isChecked=true;
        }
      }
    }
    
  }

  ngOnInit() {
  }

}
