import { Component, OnInit } from '@angular/core';
import M from 'materialize-css'
import { DataService } from '../data.service';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.scss']
})
export class BarbersComponent implements OnInit {
  public barbers: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    this.getBarbers();
  }

  getBarbers() {
    this.dataService.sendApiRequest("getBarbers/", null).subscribe((res: any) => {
      this.barbers = res.data
      console.log(this.barbers);
    })
  }

}
