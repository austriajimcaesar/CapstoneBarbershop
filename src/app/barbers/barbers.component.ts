import { Component, OnInit } from '@angular/core';
import M from 'materialize-css'

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.scss']
})
export class BarbersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
      var elems = document.querySelectorAll('.modal');
      var options = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, options);
   
  }

}
