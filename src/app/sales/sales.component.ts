import { Component, OnInit } from '@angular/core';
// declare const M: any;
import M from 'materialize-css'
import { DataService } from '../data.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(private ds:DataService) { }
  a: any[] = [];
  ngOnInit(): void {
    // M.AutoInit();

    // document.addEventListener('DOMContentLoaded', function() {
    
    // });
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    this.getBarbers();
  }

  getBarbers() {
    this.ds.sendApiRequest("getBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      console.log(data.payload)
    });
  }
 
  
}
