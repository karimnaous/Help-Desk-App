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
    // localStorage.setItem('user1', JSON.stringify('Layal'));
    // localStorage.setItem('user2', JSON.stringify('Alex'));
    // localStorage.setItem('user3', JSON.stringify('Lynn'));
    // localStorage.setItem('user4', JSON.stringify('Tala'));

    let officer = [
      {username:"Layal"},
      {username:"Alex"},
      {username:"Lynn"},
      {username:"Tala"},
      {username:"Karim"}
    ];

    localStorage.setItem('officer', JSON.stringify(officer));

    let task = [
      {id:"0", username:"Layal", priority:"High", date:"2019-06-13T11:14:12.880+03:00", domain:["Project Management","IT","Architecture"]},
      {id:"1", username:"Alex", priority:"Low", date:"2019-04-15T11:14:12.880+06:00", domain:["Mechanical","Architecture"]}
    ];

    localStorage.setItem('task', JSON.stringify(task));
    
    this.retreivetask(1);
  }

  public form = [
    { val: 'Project Management', isChecked: false },
    { val: 'IT', isChecked: false },
    { val: 'Architecture', isChecked: false },
    { val: 'Civil', isChecked: false },
    { val: 'Mechanical', isChecked: false },
    { val: 'Telecom', isChecked: false }
  ];
  
  // public user1 = JSON.parse(localStorage.getItem('user1'));
  // public user2 = JSON.parse(localStorage.getItem('user2'));
  // public user3 = JSON.parse(localStorage.getItem('user3'));
  // public user4 = JSON.parse(localStorage.getItem('user4'));

  public officer=JSON.parse(localStorage.getItem('officer'));

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

  //public task1=JSON.parse(localStorage.getItem('task1'));
  public task=JSON.parse(localStorage.getItem('task'));
  
  async retreivetask(id: any)
  {
    this.username=this.officer[id].username;
    this.priority=this.task[id].priority;
    this.date= this.task[id].date;

    for(let entry of this.task[id].domain)
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
