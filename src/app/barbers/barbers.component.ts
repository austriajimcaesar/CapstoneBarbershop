import { Component, OnInit, ViewChild } from '@angular/core';
// declare const M: any;
import M from 'materialize-css'
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.scss']
})
export class BarbersComponent implements OnInit {
  usernameNg:any;
  passwordNg:any;
  firstnameNg:any;
  lastnameNg:any;
  emailNg:any;
  contactnoNg:any;

  public barbers: any[] = [];
  constructor(private ds: DataService) { }
  a: any[] = [];
  b: any[] = [];
  displayedColumns: string[] = ['Barber ID', 'Username', 'First Name', 'Last Name', 'Email', 'Contact No'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    this.getBarbers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBarbers(){
    this.ds.sendApiRequest("getBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      this.dataSource = new MatTableDataSource(this.a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.a)
    });
  }
  
  clear(){
    this.usernameNg = "";
    this.passwordNg = "" ;
    this.firstnameNg = ""; 
    this.lastnameNg= "";
    this.emailNg = "";
    this.contactnoNg = "";
  }

  signupbarbers(){
    const requestPayload: any = {};
    requestPayload.barbers_username = this.usernameNg;
    requestPayload.barbers_password = this.passwordNg;
    requestPayload.barbers_fname = this.firstnameNg;
    requestPayload.barbers_lname = this.lastnameNg;
    requestPayload.barbers_email = this.emailNg;
    requestPayload.barbers_contactno = this.contactnoNg;
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
        this.ds.sendApiRequest("signupbarbers/", requestPayload).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Sucessfully Registered!',
            'success'
          )
          this.b = data.payload;
          this.getBarbers();
          this.clear();
          
        });
      }
    })
  }

  

}
