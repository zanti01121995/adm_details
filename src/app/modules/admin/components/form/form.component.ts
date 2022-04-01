import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { studentmodel } from './student.model';

import { async } from '@firebase/util';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})


export class FormComponent implements OnInit {
  // favoriteSeason: string = "";
 
  
  readonly d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
]

// permutation table
readonly p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
]

 studadhaar =new BehaviorSubject<boolean>(false);
 parentsadhaar =new BehaviorSubject<boolean>(false);
 Istrue!:boolean;
 Istrue2!:boolean;
  // startDate = new Date(1990, 0, 1);
 selectedValue : string="";
 myvalue: string="";
 student:studentmodel = new studentmodel();
 filterName:any = [];
 studentnum:any=[];
 

 task!:AngularFireUploadTask;
 uploadPercent!: Observable<any>;
  downloadURL!: Observable<string>;
  imagelink!:Observable<any>
  file!:any
 
  detailsobject:studentmodel=new studentmodel();
  constructor( private storage: AngularFireStorage,
    public api:AuthService,private afs: AngularFirestore,private router:Router,private notifyService: ToastService) { }
 
  ngOnInit(): void {
  // this.api.sendlist();
  this.api.updateform.subscribe(data=>{
    
     this.changevalue(data)
    console.log(data)
  
   
  })
  this.studadhaar.subscribe(data=>{
    this.Istrue=data;
    
   })
   this.parentsadhaar.subscribe(data=>{
    this.Istrue2=data;
    
   })
  }
  
  
   onclick(){
    if(this.api.admform.value.id==null){
      console.log(this.api.admform.value);
    this.api.insertstudent(this.api.admform.value)
    this.showToasterSuccess1();
    }
    else
    {
      this.api.updatestudent(this.api.admform.value,this.api.admform.value.id);
      this.showToasterSuccess2();
    }
    
    this.api.admform.reset()
    
    // this.router.navigate(['./admin/data'])
    }
    clear(){
      this.api.admform.reset()
    }
upload(event:any){
 this.file =event.target.files[0];
}

showToasterSuccess1() {
  this.notifyService.showSuccess(
    'Admission Created Successfully !!',
    'Savithri Vidyalaya'
  );
}
showToasterSuccess2() {
  this.notifyService.showSuccess(
    'Updated Details Successfully !!',
    'Savithri Vidyalaya'
  );
}
uploadFile() {
  
  const filePath = "/files"+Math.random()+this.file;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, this.file);
  task.then((f) => {
    return f.ref.getDownloadURL().then((url) => {
      console.log(url);
    this.api.imageurl=url
    
    })})
  

  // observe percentage changes
  this.uploadPercent = task.percentageChanges();
  // get notified when the download URL is available
  task.snapshotChanges().pipe(
      finalize(() => {
        
        this.downloadURL = fileRef.getDownloadURL()
       
        
        // this.admform.patchValue({
        //   'imagelink':this.downloadURL
        // })
      } )
   )
  .subscribe(
   
     
  )  
 
 }
changevalue(dat:any){
  console.log(dat.id)

  this.api.admform.patchValue({...dat})

  // if(dat.id==null){
  //   this.api.onhide.next(true)
  // }
  // console.log(dat)
  // this.feesform.controls['name'].setValue(dat.name);
  // this.api.admform.controls['firstname'].setValue(dat.name);
  // this.detailsobject.$key= this.changevalue.$key;
  //  this.detailsobject.firstname=this.changevalue.firstname;
// //    this.detailsobject.lastname=this.admform.value.lastname;
// //    this.detailsobject.DOB=this.admform.value.DOB;
// //   this.detailsobject.gender=this.admform.value.gender;
// //    this.detailsobject.bloodgroup=this.admform.value.bloodgroup;
// //    this.detailsobject.father=this.admform.value.father;
// //    this.detailsobject.mother=this.admform.value.mother;
// //    this.detailsobject.sadhaar=this.admform.value.sadhaar;
// //    this.detailsobject.padhaar=this.admform.value.padhaar;
// //    this.detailsobject.guardian=this.admform.value.guardian;
// //    this.detailsobject.contact=this.admform.value.contact;
// //    this.detailsobject.email=this.admform.value.email;
// //    this.detailsobject.DOA=this.admform.value.DOA;
// //    this.detailsobject.SOA=this.admform.value.SOA;
// //    this.detailsobject.nation=this.admform.value.nation;
// //    this.detailsobject.religion=this.admform.value.religion;
// //    this.detailsobject.community=this.admform.value.community;
// //    this.detailsobject.caste=this.admform.value.caste;
// //    this.detailsobject.address=this.admform.value.address;
// //    this.detailsobject.pin=this.admform.value.pin;
// //   this.detailsobject.extra=this.admform.value.extra;
// //    this.detailsobject.studid=this.admform.value.studid;
// //    this.detailsobject.imagelink= this.imageurl
// // console.log(this.detailsobject)
// //  this.api.poststudent(this.detailsobject).subscribe(data=>{
// //   console.log(data)
// //    alert("updated")
//   })


 }
//  update(){
//    this.student = this.api.admform.value;
//    this.api.updatestudent(this.api.admform.value,this.api.admform.value.id).subscribe(data=>{
//     console.log(data)
   
//     alert("updated")
//   })
//  }
generateid(){
  this.afs.
  collection<any>('items', ref =>
    ref)
  .valueChanges({ idField: 'id' }).subscribe((data) => {
    data.forEach((e:any)=>this.filterName.push(e.studid*1))
    console.log(this.filterName);
    this.filterName.forEach((ele:any)=>this.studentnum.push(ele*1));
    console.log( this.studentnum)
    const largest = Math.max(...this.studentnum);
    console.log(largest)
    const NewAdm = largest+1;
    console.log(NewAdm)
    this.api.admform.controls['studid'].setValue(NewAdm);
  })

}

 


  

  validate(aadharNumber:any) {
    let c = 0
    let invertedArray = aadharNumber.split('').map(Number).reverse()

    invertedArray.forEach((val:any, i:any) => {
        c = this.d[c][this.p[(i % 8)][val]]
    })

    return (c === 0)
}
  verifyp(event:any) {
  
    var x=this.api.admform.value.padhaar;
    var aadharNo = x.toString()
    console.log(typeof(aadharNo))
    if(this.validate(aadharNo)) {
      console.log('valid');
    this.parentsadhaar.next(false);
    } else {
      console.log('invalid');
      this.parentsadhaar.next(true);
    }
  }
  verifys(event:any) {
    var x=this.api.admform.value.sadhaar;
    var aadharNo = x.toString()
    console.log(typeof(aadharNo))
    if(this.validate(aadharNo)) {
     console.log('valid');
     this.studadhaar.next(false);
    } else {
      console.log('invalid');
      this.studadhaar.next(true);
    }
  }

}
