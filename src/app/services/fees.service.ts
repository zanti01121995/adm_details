import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { schoolfee } from '../modules/admin/components/schoolfee/schoolfee.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { studentmodel } from '../modules/admin/components/form/student.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})


export class FeesService {
  feespart!:any;
  feespart1 !:any;
  updatedvalues = new BehaviorSubject<any>({});
  sendapivalues = new BehaviorSubject<any>({});
  feesdetails= new BehaviorSubject<any>({});
  values = new BehaviorSubject<any>({});
  billvalues = new BehaviorSubject<any>({});
  term = new BehaviorSubject<boolean>(false);
  bus = new BehaviorSubject<boolean>(false);
  other = new BehaviorSubject<boolean>(false);
  private feesCollection: AngularFirestoreCollection<any>;
  feesdata: Observable<any[]>;
  commonBill = new BehaviorSubject<any>({});
  constructor(private afs: AngularFirestore) {
    this.feesCollection = afs.collection<any>('feesdata');
    this.feesdata = this.feesCollection.valueChanges();
  }
 
  // arrayvalue()
  // {
  //   this.billvalues.subscribe((data:any)=>{
  //     this.i = data
  //     console.log(this.i)
  //   })
  // }
//   feesform:FormGroup = new FormGroup({
//     name: new FormControl(''),
//     studentid: new FormControl(''),
//     standard:new FormControl(''),
//     allotedfee:new FormControl(''),
//     balance: new FormControl(''),
//     triptype: new FormControl(''),
//     allotedbusfee:new FormControl(''),
//     boardingpoint:new FormControl(''),
//     selectedECA:new FormControl(''),
//     allotedECAfee:new FormControl(''),

//     termfees:new FormArray([]), 
//     busfee:new FormArray([]),
//     otherfee:new FormArray([]),
        
    
// })

// termbill(dat:any){
//   this.termspec.next(dat.termfees)
// }
// busbill(dat:any){
//   this.busspec.next(dat.busfee)
// }
// otherbill(dat:any){
//   this.otherspec.next(dat.otherfee)
// }
  // console.log(dat.busfee)
  // console.log(dat.otherfee)
  // this.x = dat.termfees;

  addItem() {
  this.feesdetails.subscribe(data=>{
    this.feespart = data
  })
    this.feesCollection.add(this.feespart);
  }
 
  updateItem(docId: string) {
    this.updatedvalues.subscribe(data=>{
     this.feespart1 = data;
    })
    // this.itemsCollection.add(item);
    return this.afs.doc('feesdata/'+docId).update(this.feespart1);
  }
  
  getvalue() {
    this.afs.
      collection<any>('feesdata', ref =>
        ref)
      .valueChanges({ idField: 'id' }).subscribe((data) => {
        console.log(data);
        this.sendapivalues.next(data);
      }
      );
  }
//  sendvalue(save:any){
//    return this.afs.collection<schoolfee>('items')
//    }

  //  getvalue(){
  //    return this.http.get<schoolfee[]>('http://localhost:3000/posts');
  //    }

  //    getvaluebyid(id:number){
  //      return this.http.get<schoolfee>('http://localhost:3000/posts/'+id);
  //    }

  //  editvalue(save:any,id:number){
  //    return this.http.put<any>('http://localhost:3000/posts/'+id,save)
  //  }

  //  removevalue(id:any){
  //    return this.http.delete<any>('http://localhost:3000/posts/'+id)
  //  }


}
