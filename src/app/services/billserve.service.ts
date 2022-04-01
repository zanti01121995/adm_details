import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeesService } from './fees.service';

@Injectable({
  providedIn: 'root'
})
export class BillserveService implements OnInit {
  private billCollection: AngularFirestoreCollection<any>;
  billpart!:any;
  billdata!: Observable<any[]>;
 billpart1 !:any;
  updatedbillvalues = new BehaviorSubject<any>({});
  billdetails= new BehaviorSubject<any>({});
  constructor(public api:FeesService, private afs: AngularFirestore) { this.billCollection = afs.collection<any>('bills');
  this.billdata = this.billCollection.valueChanges(); }

ngOnInit(): void {
  this.api.commonBill.subscribe(data=>{
    console.log(data)

  })
}
addItem() {
  this.billdetails.subscribe(data=>{
    this.billpart = data
  })
    this.billCollection.add(this.billpart);
  }
  
 
 
}
