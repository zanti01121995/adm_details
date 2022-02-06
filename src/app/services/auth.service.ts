import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { DatePipe } from '@angular/common';
import { schoolfee } from '../modules/admin/components/schoolfee/schoolfee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
 
  
  datavalue=new BehaviorSubject<any>({})
  updatevalue=new BehaviorSubject<any>({})
  imageurl!:string
  studentlist!:AngularFireList<any>
  
  update(row:any){
    console.log(row);
    this.updatevalue.next(row)
  }

  carddetails(row:any){
 
  this.datavalue.next(row)
}
  constructor(private router: Router,private firebase:AngularFireDatabase,private datePipe: DatePipe,private http:HttpClient) { }
  admform:FormGroup= new FormGroup({
    $key: new FormControl(null),
    firstname: new FormControl('',[Validators.required,Validators.minLength(2), Validators.maxLength(20)]),
    lastname: new FormControl('',[Validators.required,Validators.minLength(2), Validators.maxLength(20)]),
    DOB: new FormControl(''),
    gender: new FormControl(''), 
    bloodgroup: new FormControl(''),
    father: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    mother: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    sadhaar: new FormControl('',[Validators.required,Validators.minLength(12), Validators.maxLength(12)]),
    padhaar: new FormControl('',[Validators.required,Validators.minLength(12), Validators.maxLength(12)]),
    guardian: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    contact: new FormControl('',[Validators.required,Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('',[Validators.email]),
    DOA: new FormControl(''),
    SOA: new FormControl(''),
    nation: new FormControl(''),
    religion: new FormControl(''),
    community: new FormControl(''),
    caste: new FormControl(''),
    address: new FormControl(''),
    pin: new FormControl(''),
    extra: new FormControl(''),
    studid: new FormControl(''),
    imagelink: new FormControl()
   
  });
  
  
  sendlist(){
    this.studentlist=this.firebase.list('students');
    return this.studentlist.snapshotChanges();
  }
  
  insertstudent(students:any){

    this.studentlist.push({
    
    firstname:students.firstname,
    lastname:students.lastname,
    DOB:students.DOB== "" ? "" : this.datePipe.transform(students.DOA, 'yyyy-MM-dd'),
    gender:students.gender,
    bloodgroup:students.bloodgroup,
    father:students.father,
    mother:students.mother,
    sadhaar:students.sadhaar,
    padhaar:students.padhaar,
    guardian:students.guardian,
    contact:students.contact,
    email:students.email,
    DOA:students.DOA== "" ? "" : this.datePipe.transform(students.DOA, 'yyyy-MM-dd'),
    SOA:students.SOA,
    nation:students.nation,
    religion:students.religion,
    community:students.community,
    caste:students.caste,
    address:students.address,
    pin:students.pin,
    extra:students.extra,
    studid:students.studid,
    imagelink:students.imagelink=this.imageurl
    });
    
  }
  updatestudent(students:any){
    this.studentlist.update(students.$key,{
    
      firstname:students.firstname,
      lastname:students.lastname,
      DOB:students.DOB== "" ? "" : this.datePipe.transform(students.DOA, 'yyyy-MM-dd'),
      gender:students.gender,
      bloodgroup:students.bloodgroup,
      father:students.father,
      mother:students.mother,
      sadhaar:students.sadhaar,
      padhaar:students.padhaar,
      guardian:students.guardian,
      contact:students.contact,
      email:students.email,
      DOA:students.DOA== "" ? "" : this.datePipe.transform(students.DOA, 'yyyy-MM-dd'),
      SOA:students.SOA,
      nation:students.nation,
      religion:students.religion,
      community:students.community,
      caste:students.caste,
      address:students.address,
      pin:students.pin,
      extra:students.extra,
      studid:students.studid,
      imagelink:students.imagelink=this.imageurl
      });

  }


  setToken(token:string):void{
    localStorage.setItem('token',token);
  }
 getToken():string|null{
   return localStorage.getItem('token');
 }
 isLoggedIn(){
   return this.getToken()!==null;
 }
 logout(){
   localStorage.removeItem('token');
   this.router.navigate(['login']);
 }
 login({email,password}:any):Observable<any>{
   if(email ==='zanti123@gmail.com' && password==='zanti123'){
     this.setToken('abcdefghijklmnopqrstuvwxyz');
     return of({name : 'zanti',email:'zanti123@gmail.com'});
   }
   return throwError(new Error('Failed to login'));
 }


 


}
