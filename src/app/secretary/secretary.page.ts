import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.page.html',
  styleUrls: ['./secretary.page.scss'],
})
export class SecretaryPage implements OnInit {

  public array: any[];
  public item1:any;
  constructor() { 
    this.array=this.getArray();
    this.item1={"Cat":"c"};
    window.localStorage.setItem("ObjArray", JSON.stringify([
      {"id":1,"type":"txt1","priority":"low","date":"1/1/2009"},
      {"id":2,"type":"txt1","priority":"low","date":"1/1/2009"},
      {"id":3,"type":"txt1","priority":"low","date":"1/1/2009"}, 
      {"id":4,"type":"txt1","priority":"low","date":"1/1/2009"}
    ]))

  }

  ngOnInit() {
  
  }


 getArray(): Object[] {
    var localStorageItem=JSON.parse(localStorage.getItem("ObjArray"));
    return localStorageItem;

  }

}
