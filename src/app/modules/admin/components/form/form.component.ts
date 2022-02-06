import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { finalize, Observable } from 'rxjs';
import { studentmodel } from './student.model';

import { async } from '@firebase/util';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  favoriteSeason: string = "";
 
 
  // startDate = new Date(1990, 0, 1);
 selectedValue : string="";
 myvalue: string="";
 


 task!:AngularFireUploadTask;
 uploadPercent!: Observable<any>;
  downloadURL!: Observable<string>;
  imagelink!:Observable<any>
  file!:any
  

  detailsobject:studentmodel=new studentmodel();
  constructor( private storage: AngularFireStorage,
    public api:AuthService) { }
 
  ngOnInit(): void {
  this.api.sendlist();
  this.api.updatevalue.subscribe(data=>{
    // this.changevalue=data;
    console.log(data)
  })
  }
  
  
   onclick(){
    if(!this.api.admform.get('$key').value){
      console.log(this.api.admform.value);
    this.api.insertstudent(this.api.admform.value)
    }
    else
    {
      this.api.updatestudent(this.myvalue);
    }
    
    // this.admform.reset()
    }
upload(event:any){
 this.file =event.target.files[0];
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
// changevalue(dat:any){
//    this.detailsobject.$key= this.changevalue.$key;
//    this.detailsobject.firstname=this.changevalue.firstname;
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


//  }
}
