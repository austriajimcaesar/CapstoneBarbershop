import { Component, OnInit } from '@angular/core';
import M from 'materialize-css'
import { DataService } from '../data.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  public schedules: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, options);

    this.getSchedules();
  }

  getSchedules() {
    this.dataService.sendApiRequest("selectScheduleJoin/", null).subscribe((res: any) => {
      this.schedules = res.data
      console.log(this.schedules);
    })
  }

}
