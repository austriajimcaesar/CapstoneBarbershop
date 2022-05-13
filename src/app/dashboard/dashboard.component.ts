import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
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
  e: any[] = [];
  totalSales: any;
  totalMoney: any = 0;
  totalMoneyFiltered: any = 0;
  totalBarber: any = 0;
  totalSchedules: any = 0;
  adminID:any;
  barberNg: any;
  barbersid: any;
  dateid: any;
  constructor(private ds:DataService) { }

  ngOnInit() {
    this.selectPosBarbersLast()
    this.selectPosBarbers()
    this.getBarbers();
    this.getSchedules();
    this.adminID = window.sessionStorage.getItem("admin_id");
    console.log(this.adminID)
    setTimeout(() => {
      M.AutoInit();
  }, 100);
  }

  testing(){
    if(this.barbersid && this.dateid != null){
    console.log(this.barbersid + this.dateid)
    this.totalMoneyFiltered = 0;
    this.selectPosBarbersFilter();
    }
  }

  selectPosBarbersFilter() {
    this.ds.sendApiRequest2("selectPosBarbersFilter/", null, this.barbersid+"/"+this.dateid).subscribe((data: { payload: any[]; }) => {
      this.e = data.payload;
      
      for(var i =0; i < this.e.length; i++){
      this.totalMoneyFiltered = this.e[i].pos_payment + this.totalMoneyFiltered;
      }
      
      console.log(this.e)
    });
  }

  selectPosBarbers() {
    this.ds.sendApiRequest("selectPosBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.b = data.payload;
      this.totalSales = this.b.length
      
      for(var i =0; i < this.b.length; i++){
      this.barberNg = this.b[i].pos_barbers_id + ". "+ this.b[i].barbers_fname + " " + this.b[i].barbers_lname;
      this.totalMoney = this.b[i].pos_payment + this.totalMoney;
      }
      
      console.log(this.b)
    });
  }

  getBarbers(){
    this.ds.sendApiRequest("getBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.c = data.payload;
      this.totalBarber = this.c.length
      
      console.log(this.c)
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
