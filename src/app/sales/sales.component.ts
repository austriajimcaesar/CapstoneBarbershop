import { Component, OnInit, ViewChild } from '@angular/core';
// declare const M: any;
declare const M: any;
import * as M from "materialize-css";
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})


export class SalesComponent implements OnInit {
  
  a: any[] = [];
  b: any[] = [];
  c: any[] = [];
  e: any[] = [];
  displayedColumns: string[] = ['pos_id', 'Barber', 'Payment', 'Created', 'Updated', 'Actions'];
  dataSource:any;
  posidNg: any;
  barberNg: any;
  paymentNg: any;
  createdNg: any;
  updatedNg: any;
  barbersidNg:any;
  barbersidCut:any;
  updateTrue:boolean;
  
  requestPayload: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ds:DataService) { }
   

  AfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    var elem1 = document.querySelector('.autocomplete');
    var options1 = {minLength: 0,
                    data: this.e,
                    onAutocomplete: function(val) {
                      window.sessionStorage.setItem('barberidAuto', val);
                      console.log(window.sessionStorage.getItem('barberidAuto'));
                  }};
    // M.AutoInit();

    // document.addEventListener('DOMContentLoaded', function() {
    
    // });
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    
    this.selectPosBarbers();
    this.getBarbers();
    setTimeout(() => {
      M.AutoInit();
      M.Autocomplete.init(elem1, options1);
  }, 100);
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  selectPosBarbers() {
    this.ds.sendApiRequest("selectPosBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      this.dataSource = new MatTableDataSource(this.a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // for (var i = 0; i < this.a.length; i++) {
      //   console.log(this.a[i].barbers_id+". "+this.a[i].barbers_fname+" "+this.a[i].barbers_lname);
      //   this.b[this.a[i].barbers_id+". "+this.a[i].barbers_fname+" "+this.a[i].barbers_lname] = this.a[i].flag; //countryArray[i].flag or null
      // }
      // console.log(this.a)
    });
  }

  getBarbers(){
    this.ds.sendApiRequest("getBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.b = data.payload;
      for (var i = 0; i < this.b.length; i++) {
        
        this.e[this.b[i].barbers_id+". "+this.b[i].barbers_fname+" "+this.b[i].barbers_lname] = this.b[i].flag; //countryArray[i].flag or null
        console.log(this.e);
      }
    });
  }

  addSales(){
    const requestPayload: any = {};
    this.barbersidCut = window.sessionStorage.getItem('barberidAuto')
    this.barbersidCut = this.barbersidCut.split('.')[0];
    console.log(this.barbersidCut);
    requestPayload.pos_payment =  this.paymentNg;
    requestPayload.pos_barbers_id = this.barbersidCut;
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
        this.ds.sendApiRequest("addSales/", requestPayload).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Sale Added!',
            'success'
          )
          this.clear();
          this.c = data.payload;
          this.selectPosBarbers();
          
        });
      }
    })
  }
  salesDelete: any = {};
  deleteSales(id){
    this.salesDelete.pos_isDeleted = 1;
    Swal.fire({
      title: 'Warning',
      text: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B8BEB',
      cancelButtonColor: '#DD2C00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendApiRequest2("updateSales/", this.salesDelete, id).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Sale Updated!',
            'success'
          )
          this.c = data.payload;
          this.selectPosBarbers();
          
        });
      }
    })
  }
  salesUpdate: any = {};
  updateSales(){
    this.salesUpdate.pos_payment = this.paymentNg;
    this.barbersidCut = window.sessionStorage.getItem('barberidAuto')
    this.barbersidCut = this.barbersidCut.split('.')[0];
    this.salesUpdate.pos_barbers_id = this.barbersidCut
    if(this.salesUpdate.pos_barbers_id==""){
      this.barberNg.split('.')[0];
      this.salesUpdate.pos_barbers_id=this.barberNg;
    }

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
        this.ds.sendApiRequest2("updateSales/", this.salesUpdate, this.posidNg).subscribe((data: { payload: any[]; }) => {
          Swal.fire(
            'Success',
            'Sale Updated!',
            'success'
          )
          this.c = data.payload;
          this.selectPosBarbers();
          
        });
      }
    })
  }
  
  

  
  clear(){
    this.updateTrue = false;
    this.posidNg = "";
    this.barberNg = "" ;
    this.paymentNg = ""; 
    this.createdNg= "";
    this.updatedNg = "";
  }

  fillModal(posid, barbersid, fname, lname, payment, created, updated){
    this.updateTrue = true;
    this.posidNg = posid;
    this.barbersidNg = barbersid;
    this.barberNg = barbersid +". "+ fname + " " + lname;
    this.paymentNg = payment;
    this.createdNg= created;
    this.updatedNg = updated;
    this.barbersidCut = this.barberNg.split('.')[0];

  }
}



// const ELEMENT_DATA: POSElements[] = [
//   {Name: 1, Barber: 'Hydrogen', Price: 1.0079, symbol: 'H'},
//   {Name: 2, Barber: 'Helium', Price: 4.0026, symbol: 'He'},
//   {Name: 3, Barber: 'Lithium', Price: 6.941, symbol: 'Li'},
//   {Name: 4, Barber: 'Beryllium', Price: 9.0122, symbol: 'Be'},
//   {Name: 5, Barber: 'Boron', Price: 10.811, symbol: 'B'},
//   {Name: 6, Barber: 'Carbon', Price: 12.0107, symbol: 'C'},
//   {Name: 7, Barber: 'Nitrogen', Price: 14.0067, symbol: 'N'},
//   {Name: 8, Barber: 'Oxygen', Price: 15.9994, symbol: 'O'},
//   {Name: 9, Barber: 'Fluorine', Price: 18.9984, symbol: 'F'},
//   {Name: 10, Barber: 'Neon', Price: 20.1797, symbol: 'Ne'},
//   {Name: 11, Barber: 'Sodium', Price: 22.9897, symbol: 'Na'},
//   {Name: 12, Barber: 'Magnesium', Price: 24.305, symbol: 'Mg'},
//   {Name: 13, Barber: 'Aluminum', Price: 26.9815, symbol: 'Al'},
//   {Name: 14, Barber: 'Silicon', Price: 28.0855, symbol: 'Si'},
//   {Name: 15, Barber: 'Phosphorus', Price: 30.9738, symbol: 'P'},
//   {Name: 16, Barber: 'Sulfur', Price: 32.065, symbol: 'S'},
//   {Name: 17, Barber: 'Chlorine', Price: 35.453, symbol: 'Cl'},
//   {Name: 18, Barber: 'Argon', Price: 39.948, symbol: 'Ar'},
//   {Name: 19, Barber: 'Potassium', Price: 39.0983, symbol: 'K'},
//   {Name: 20, Barber: 'Calcium', Price: 40.078, symbol: 'Ca'},
// ];
