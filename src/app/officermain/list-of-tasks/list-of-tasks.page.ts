import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.page.html',
  styleUrls: ['./list-of-tasks.page.scss'],
})
export class ListOfTasksPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

}
