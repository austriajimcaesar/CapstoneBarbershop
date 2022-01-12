import { Component, OnInit, ViewChild } from '@angular/core';
// declare const M: any;
import M from 'materialize-css'
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})


export class SalesComponent implements OnInit {
  a: any[] = [];
  displayedColumns: string[] = ['pos_id', 'Barber', 'Payment', 'Created', 'Updated', 'Actions'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private ds:DataService) { }
   

  AfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    // M.AutoInit();

    // document.addEventListener('DOMContentLoaded', function() {
    
    // });
    var elems = document.querySelectorAll('.modal');
    var options = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    
    this.selectPosBarbers();
  }

  selectPosBarbers() {
    this.ds.sendApiRequest("selectPosBarbers/", null).subscribe((data: { payload: any[]; }) => {
      this.a = data.payload;
      this.dataSource = new MatTableDataSource(this.a);
      console.log(this.dataSource.data)
    });
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
