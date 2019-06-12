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

  async savetask()
  {
    
    var info = [this.username, this.priority, this.date];
    localStorage.setItem('task1', JSON.stringify(info));
  }

  ngOnInit() {
  }

}
