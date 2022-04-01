import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { FeesService } from 'src/app/services/fees.service';
import { SchoolfeeComponent } from '../schoolfee/schoolfee.component';
import { schoolfee } from '../schoolfee/schoolfee.model';

@Component({
  selector: 'app-feestable1',
  templateUrl: './feestable1.component.html',
  styleUrls: ['./feestable1.component.scss']
})
export class Feestable1Component implements OnInit {
  myobj: schoolfee = new schoolfee();
  mydata: any;
  balance: number = 0;
  
 
  // column =["id","name","studentid","allotedfee","term1","term2","term3","balance","actions"];
  // index = ["id","name","studentid","allotedfee","term1","term2","term3","balance"];
  displayedColumns: string[] = ["studentid", "name", "allotedfee", "balance", "actions"];
  displayedColumns2: string[] = ["studentid", "name","allotedbusfee", "balance2",  "actions"];
  displayedColumns3: string[] = ["studentid", "name", "allotedECAfee","balance3", "actions"];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public api: FeesService, private dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {

    this.displayvalues();
   
    // this.values.subscribe(data => {
    //   // this.changevalue(data)
    // })
    



  }
  displayvalues() {
    this.api.getvalue();
    this.api.sendapivalues.subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res);
        console.log(res)
      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
 

  clickedit(row: any) {
    this.api.values.next(row)
    console.log(row);
    this.router.navigate(['./admin/update',row.id])
    
      
    // this.values.next(row)

  }
  // changevalue(dat: any) {
  //   this.myobj.id = dat.id;
  //   this.api.feesform.controls['name'].setValue(dat.name);
  //   this.api.feesform.controls['studentid'].setValue(dat.studentid);
  //   this.api.feesform.controls['allotedfee'].setValue(dat.allotedfee);
  //   this.api.feesform.controls['balance'].setValue(dat.balance);
  // }

  // deletevalue(dat: any) {
  //   this.api.removevalue(dat.id).subscribe(data => {
  //     alert("deleted")

  //   })

  // }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
