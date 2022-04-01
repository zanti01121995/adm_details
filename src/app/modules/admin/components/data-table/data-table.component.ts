import {  Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import { DataTableDataSource, DataTableItem } from './data-table-datasource';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
// export class DataTableComponent implements AfterViewInit, OnInit {
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild(MatTable) table!: MatTable<DataTableItem>;
//   dataSource: DataTableDataSource;
//   values:any;
  


//   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
//   displayedColumns = ['firstname','studid','DOB','Actions'];
//   constructor(private api:AuthService, private firebase:AngularFireDatabase) {
//     this.dataSource = new DataTableDataSource();
//   }

//   ngOnInit(): void {
//       this.firebase.list('students').valueChanges().subscribe( (students:any) => {
//         console.log(students)
//         this.table.dataSource = students;
        
//         this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;})
       
//   }

  
//   ngAfterViewInit(): void {
  
    
//     // this.table.dataSource = this.dataSource;
//   }
//   // applyFilter(event: Event) {
//   //   const filterValue = (event.target as HTMLInputElement).value;
//   //   this.dataSource.filter = filterValue.trim().toLowerCase();

//   //   if (this.dataSource.paginator) {
//   //     this.dataSource.paginator.firstPage();
//   //   }
//   // }
// }

export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['firstname','studid','DOB','Actions'];
  dataSource!: MatTableDataSource<any>;
  filterName:any = [];
  studentnum:any=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:AuthService, private afs: AngularFirestore,private firebase:AngularFireDatabase,private router:Router) {}
ngOnInit(): void {
  this.viewvalues()
}
 viewvalues(){
  this.afs.
  collection<any>('items', ref =>
    ref)
  .valueChanges({ idField: 'id' }).subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // data.forEach((e:any)=>this.filterName.push(e.studid*1))
    // console.log(this.filterName);
    // this.filterName.forEach((ele:any)=>this.studentnum.push(ele*1));
    // console.log( this.studentnum)
    // const largest = Math.max(...this.studentnum);
    // console.log(largest)
    // const NewAdm = largest+1;
    // console.log(NewAdm)
  })
 
 }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clickonrow(row:any){
    this.api.carddetails(row)
  }
  onedit(row:any){
    this.api.updateform.next(row)
    // console.log(row)
    this.router.navigate(['./admin/edit',row.id])
  }
}
