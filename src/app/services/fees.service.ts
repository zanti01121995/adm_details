import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { schoolfee } from '../modules/admin/components/schoolfee/schoolfee.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { studentmodel } from '../modules/admin/components/form/student.model';


@Injectable({
  providedIn: 'root'
})


export class FeesService {
  values = new BehaviorSubject<any>({});
  billvalues = new BehaviorSubject<any>({});
  term = new BehaviorSubject<boolean>(false);
  bus = new BehaviorSubject<boolean>(false);
  other = new BehaviorSubject<boolean>(false);

  commonBill = new BehaviorSubject<any>({});
 constructor(private http:HttpClient){

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

 
 

 sendvalue(save:any){
   return this.http.post('http://localhost:3000/posts',save);
   }

   getvalue(){
     return this.http.get<schoolfee[]>('http://localhost:3000/posts');
     }

     getvaluebyid(id:number){
       return this.http.get<schoolfee>('http://localhost:3000/posts/'+id);
     }

   editvalue(save:any,id:number){
     return this.http.put<any>('http://localhost:3000/posts/'+id,save)
   }

   removevalue(id:any){
     return this.http.delete<any>('http://localhost:3000/posts/'+id)
   }


}
