import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/services/auth.service';
import { studentmodel } from '../form/student.model';
@Component({
  selector: 'app-pro-card',
  templateUrl: './pro-card.component.html',
  styleUrls: ['./pro-card.component.scss']
})


export class ProCardComponent implements OnInit {
 
 

  constructor(private api:AuthService) { }
  mydata:any
  // imgurl!:string

  ngOnInit(): void {
   
 this.api.datavalue.subscribe(data=>{
   console.log(data)
this.mydata=data
 })
 }
  

}
