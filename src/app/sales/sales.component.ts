import { Component, OnInit } from '@angular/core';
// declare const M: any;
import M from 'materialize-css'

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // M.AutoInit();

    // document.addEventListener('DOMContentLoaded', function() {
    
    // });
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  }
 
  
}
