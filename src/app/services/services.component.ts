import { Component, OnInit, ViewChild } from '@angular/core';
import M from 'materialize-css'
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public users: any[] = [];
  constructor(private ds: DataService, private router: Router) { }
  a: any[] = [];
  b: any[] = [];
  c: any[] = [];
  d: any[] = [];
  serviceidNg: any;
  servicenameNg: any;
  servicepriceNg:any;
  updateTrue:boolean;
  displayedColumns: string[] = ['Service ID', 'Service Name', 'Service Price', 'Actions'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getServices();
    this.ds.sendApiRequest("getLatestData/", null).subscribe((data: { payload: any[]; }) => {
      this.z = data.payload;
    });
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  }


  getServices(){
    this.ds.sendApiRequest("getServices/",  null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      
      this.dataSource = new MatTableDataSource(this.a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteServices(id){
    this.ds.sendApiRequest("deleteServices/"+id,  null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  clear(){
    this.updateTrue = false;
    this.serviceidNg = "";
    this.servicenameNg = "" ;
    this.servicepriceNg = ""; 
  }


  fillModal(serviceid, servicename, servieprice){
    this.updateTrue = true;
    this.serviceidNg = serviceid;
    this.servicenameNg = servicename;
    this.servicepriceNg = servieprice;

  }


  addServices(){
    const requestPayload: any = {};
    requestPayload.services_name = this.servicenameNg;
    requestPayload.services_price = this.servicepriceNg;
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to add a sale?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B8BEB',
      cancelButtonColor: '#DD2C00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendApiRequest("addServices/", requestPayload).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Sale Added!',
            'success'
          )
          this.clear();
          this.d = data.payload;
          this.getServices();
          
        });
      }
    })
  }


  servicesUpdate: any = {};
  updateServices(){
    this.servicesUpdate.services_name = this.servicenameNg;
    this.servicesUpdate.services_price = this.servicepriceNg;

    Swal.fire({
      title: 'Confirmation',
      text: 'Do you want to update?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B8BEB',
      cancelButtonColor: '#DD2C00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendApiRequest2("updateServices/", this.servicesUpdate, this.serviceidNg).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Sale Updated!',
            'success'
          )
          this.c = data.payload;
          this.getServices();
          
        });
      }
    })
  }
}
