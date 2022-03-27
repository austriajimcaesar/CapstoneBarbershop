import { Component, OnInit, ViewChild } from '@angular/core';
// declare const M: any;
import M from 'materialize-css'
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  public schedules: any[] = [];

  constructor(private ds: DataService) { }
  a: any[] = [];
  b: any[] = [];
  displayedColumns: string[] = ['Schedule ID', 'User Name', 'Barber Name', 'Date', 'Status'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit(){
  
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, options);

    this.getSchedules();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getSchedules() {
    this.ds.sendApiRequest("selectScheduleJoin/", null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      console.log(this.a);
      this.dataSource = new MatTableDataSource(this.a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.a)
    })
  }

}
