import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import M from 'materialize-css'
import { DataService } from '../data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  requestPayload: any = {};
  constructor(private ds:DataService, private router:Router) { }

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

  this.ds.sendApiRequest("getLatestData/", null).subscribe((data: { payload: any[]; }) => {
    this.z = data.payload;
  });
  }

  testing(){
    if(this.barbersid && this.dateid != null){
    console.log(this.barbersid + this.dateid)
    this.totalMoneyFiltered = 0;
    this.selectPosBarbersFilter();
    }
  }

  z: any[] = [];
  updateAudits(){
    this.requestPayload.audits_bool = 1;
    this.requestPayload.audits_id = this.z[0].audits_id;
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B8BEB',
      cancelButtonColor: '#DD2C00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendApiRequest("updateAudits/", this.requestPayload).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Logged Out!',
            'success'
          )
          this.getBarbers();
          this.router.navigate(['/']);
        });
      }
    })
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
