import { Component, OnInit, ViewChild } from '@angular/core';
// declare const M: any;
import M from 'materialize-css'
import { DataService } from '../data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  
})
export class DashboardComponent implements OnInit {
  a: any[] = [];
  b: any[] = [];
  c: any[] = [];
  d: any[] = [];
  totalSales: any;
  totalMoney: any = 0;
  totalBarber: any = 0;
  totalSchedules: any = 0;
  constructor(private ds:DataService) { }

  ngOnInit() {
    this.selectPosBarbersLast()
    this.selectPosBarbers()
    this.getBarbers();
    this.getSchedules();
  }

  selectPosBarbers() {
    this.ds.sendApiRequest("selectPosBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.b = data.payload;
      this.totalSales = this.b.length
      for(var i =0; i < this.b.length; i++){
      this.totalMoney = this.b[i].pos_payment + this.totalMoney;
      }
      
      console.log(this.totalMoney)
    });
  }

  getBarbers(){
    this.ds.sendApiRequest("getBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.c = data.payload;
      this.totalBarber = this.c.length
      
      console.log(this.totalBarber)
    });
  }

  selectPosBarbersLast() {
    this.ds.sendApiRequest("selectPosBarbersLast/", null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
    });
  }

  getSchedules() {
    this.ds.sendApiRequest("selectScheduleJoin/", null).subscribe((data: { payload: any[]; }) => {
      this.d = data.payload;
      this.totalSchedules = this.d.length;
      console.log(this.d);
    })
  }

}
