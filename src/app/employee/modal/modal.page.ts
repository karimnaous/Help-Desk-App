import { Component, OnInit } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { namespaceHTML } from '@angular/core/src/render3';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor() 
  {
    
    
   }

  ngOnInit() {
  }
 
   saveData()
  {
    
    //window.localStorage.setItem('FullName', JSON.stringify({fullName: }));
   // window.localStorage.setItem('user2', JSON.stringify({name:this.fullNames.id}));


  }
  
  public form  = [
  {valueM: "IT", isChecked: false}, 
  {valueM: "Accounting", isChecked: true},
  {valueM: "Transportation", isChecked: false}, 
  {valueM: "Architecture", isChecked: false}, 
  {valueM: "Telecom", isChecked: false}
  ];

  // public fullNames: any[] = [
  //   {
  //       id: "1",
  //       label: 'Full Name',   
  //   }
   
];
}
