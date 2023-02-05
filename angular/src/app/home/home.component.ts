import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import {  TaxProService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  taxProList:any;
errObj:boolean=false
  constructor(private _TaxProServic:TaxProService,) {}

  ngOnInit() {
  this.taxPro();

 
  }

taxPro(){
 
  this.isLoading = true;
  this._TaxProServic.getTaxProList().subscribe(
    (response) => {
    
      this.isLoading = false;
      this.taxProList=response.data.resultObj;
      console.log('response', response);
    },
    (error) => {
      this.isLoading = false;
      this.errObj = true
      console.log('response', error);
    }
  );



}
  
}
