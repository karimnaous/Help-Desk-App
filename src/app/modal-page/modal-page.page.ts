import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  private username: string;
  private priority: string;
  private date: string;

  constructor(public modalController: ModalController) { 
    localStorage.setItem('user1', JSON.stringify('Layal'));
    localStorage.setItem('user2', JSON.stringify('Alex'));
    localStorage.setItem('user3', JSON.stringify('Lynn'));
    localStorage.setItem('user4', JSON.stringify('Tala'));
    
    this.retreivetask();
  }

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];
  
  public user1 = JSON.parse(localStorage.getItem('user1'));
  public user2 = JSON.parse(localStorage.getItem('user2'));
  public user3 = JSON.parse(localStorage.getItem('user3'));
  public user4 = JSON.parse(localStorage.getItem('user4'));

  async savetask()
  {
    var myObj;

    var checked =[];
    for (let entry of this.form)
    {
      if(entry.isChecked==true)
      {
        checked.push(entry.val);
      }
    }
    myObj = {"username":this.username, "priority":this.priority, "date":this.date, "domain":checked};

    localStorage.removeItem('task1');
    localStorage.setItem('task1', JSON.stringify(myObj));
  }

  public task1=JSON.parse(localStorage.getItem('task1'));
  

  async retreivetask()
  {
    this.username=this.task1.username;
    this.priority=this.task1.priority;
    this.date= this.task1.date;

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
