import { Component, OnInit, ViewChild } from '@angular/core';
import M from 'materialize-css'
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {

  

  public users: any[] = [];
  constructor(private ds: DataService, private router: Router) { }
  a: any[] = [];
  b: any[] = [];
  displayedColumns: string[] = ['Audit ID', 'Time In', 'Time Out', 'User'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getAudits();
    this.ds.sendApiRequest("getLatestData/", null).subscribe((data: { payload: any[]; }) => {
      this.z = data.payload;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getAudits(){
    this.ds.sendApiRequest2("getAudits/",  null, "1").subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      for(var i = 0; i < this.a.length; i++) {
       if(this.a[i].audits_user==1){
        this.a[i].audits_user="Admin";
       }else{
        this.a[i].audits_user="Cashier";
      }
      }
      
      this.dataSource = new MatTableDataSource(this.a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.a)
    });
  }
  
  
  z: any[] = [];
  requestPayload: any = {};
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
  
          this.router.navigate(['/']);
        });
      }
    })
  }



}
