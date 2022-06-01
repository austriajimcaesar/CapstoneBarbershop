import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import M from 'materialize-css'
import { DataService } from '../data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
  j: any[] = [];
  totalSales: any;
  totalMoney: any = 0;
  totalMoneyFiltered: any = 0;
  totalBarber: any = 0;
  totalSchedules: any = 0;
  adminID:any;
  barberNg: any;
  barbersid: any;
  dateid: any;
  monthNg:any;
  monthyearNg:any;
  yearNg:any;
  fromNg:any;
  toNg:any;

  requestPayload: any = {};
  constructor(private ds:DataService, private router:Router) { }

  ngOnInit() {
    const elem = document.querySelector('.datepicker');
    const options = {format: 'YYYY-MM-DD',
      showClearBtn:true};
    
    this.selectPosBarbersLast()
    this.selectPosBarbers()
    this.getBarbers();
    this.getSchedules();
    this.adminID = window.sessionStorage.getItem("admin_id");
    console.log(this.adminID)
    setTimeout(() => {
      M.AutoInit();
  }, 1000);

  this.ds.sendApiRequest("getLatestData/", null).subscribe((data: { payload: any[]; }) => {
    this.z = data.payload;
  });
  
  }
 
  weekly(){
    this.selectPosBarbersWeekly();
    setTimeout(() => {
      var x = document.getElementById("hide");
      var y = document.getElementById("hide2");
      var z = document.getElementById("hide3");
      var w = document.getElementById("hide4");

      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "none";
      w.style.display = "none";
      //x.style.display = "block";
     

    
        window.print();
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";
        w.style.display = "block";

  }, 1500);

     
  }

  monthly(){
    this.selectPosBarbersMonthly();
     setTimeout(() => {
       var x = document.getElementById("hide");
       var y = document.getElementById("hide2");
       var z = document.getElementById("hide3");
       var w = document.getElementById("hide4");

       x.style.display = "none";
       y.style.display = "none";
       z.style.display = "none";
       w.style.display = "none";

     

    
         window.print();
         x.style.display = "block";
         y.style.display = "block";
         z.style.display = "block";
         w.style.display = "block";

   }, 1500);

     
  }

  yearly(){
    this.selectPosBarbersYearly();
    setTimeout(() => {
      var x = document.getElementById("hide");
      var y = document.getElementById("hide2");
      var z = document.getElementById("hide3");
      var w = document.getElementById("hide4");

      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "none";
      w.style.display = "none";
      //x.style.display = "block";
     

    
        window.print();
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";
        w.style.display = "block";

  }, 1500);

     
  }
  moneymoney:any = 0;
  authorizedBy = window.sessionStorage.getItem('admin_username');

  selectPosBarbersWeekly() {
    var getDateVar1 = (<HTMLInputElement>document.getElementById("datePick1")).value;
    var getDateVar2 = (<HTMLInputElement>document.getElementById("datePick2")).value;
    this.fromNg = moment(getDateVar1).format('YYYY-MM-DD'); // 2019-04-22
    this.toNg = moment(getDateVar2).format('YYYY-MM-DD'); // 2019-04-22
    this.ds.sendApiRequest("selectPosBarbersServices2/"+"weekly/"+this.fromNg+"/"+this.toNg, null).subscribe((data: { payload: any[]; }) => {
      this.j = data.payload;
      for(var i =0; i < this.j.length; i++){
        
        this.moneymoney += this.j[i].pos_payment;
        }
      
    });
  }
  selectPosBarbersMonthly() {
    this.ds.sendApiRequest("selectPosBarbersServices2/"+"monthly/"+this.monthNg+"/"+this.monthyearNg, null).subscribe((data: { payload: any[]; }) => {
      this.j = data.payload;
   
    });
  }

  selectPosBarbersYearly() {
    this.ds.sendApiRequest("selectPosBarbersServices2/"+"yearly/"+this.yearNg+"/"+0, null).subscribe((data: { payload: any[]; }) => {
      this.j = data.payload;
   
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
