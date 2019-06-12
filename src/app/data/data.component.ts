import { Component, OnInit} from '@angular/core';
//OnInIt
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  template: `
  <table>
      <thead>
          <th>Name</th>
          <th>Index</th>
      </thead>
      <tbody>
          <tr *ngFor="let hero of heroes">
              <td>{{hero.name}}</td>
          </tr>
      </tbody>
  </table>
  `
})

export class DataComponent implements OnInit {

  heroes = HEROES;
  constructor() { }

  ngOnInit() {}

}

const HEROES = [
  {id: 1, name:'Superman'},
  {id: 2, name:'Batman'},
  {id: 5, name:'BatGirl'},
  {id: 3, name:'Robin'},
  {id: 4, name:'Flash'}
];

name = "karim"