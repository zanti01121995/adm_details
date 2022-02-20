import { Component, OnInit } from '@angular/core';
import { FeesService } from 'src/app/services/fees.service';

@Component({
  selector: 'app-invoicebill',
  templateUrl: './invoicebill.component.html',
  styleUrls: ['./invoicebill.component.scss']
})
export class InvoicebillComponent implements OnInit {
stud!:any;
  constructor(private api:FeesService) { }
description:any;
date:any;
term!:boolean;
bus!:boolean;
other!:boolean;
amount:any;
  ngOnInit(): void {
    this.api.values.subscribe(data=>{
      console.log(data);
      this.stud = data;
    })
    this.api.term.subscribe(data=>{this.term=data;})
    this.api.bus.subscribe(ele=>{this.bus=ele;})
    this.api.other.subscribe(dat=>{this.other=dat;})
    this.Receivedvalues();
  }

 Receivedvalues(){
   if(this.term==true){
    this.api.billvalues.subscribe(data=>{
      console.log(data)
      this.description = data.type;
      this.amount = data.termfee;
      this.date = data.tpaiddate;
    })
   }
   else if(this.bus==true){
    this.api.billvalues.subscribe(data=>{
      console.log(data)
      this.description = data.monthtype;
      this.amount = data.monthfee;
      this.date = data.mpaiddate;
     
   })}

   else if(this.other==true){
    this.api.billvalues.subscribe(data=>{
      console.log(data)
      this.description = data.omonthtype;
      this.amount = data.omonthfee;
      this.date = data.opaiddate;
   })
  }
  else{
    alert("fail")
  }
}
}
  

   
 
 
 

  //  this.api.billvalues.subscribe((ele:any)=>{
  //    console.log(ele);
  //    this.i = ele;
  //  })
  //  this.api.billvalues1.subscribe((ele:any)=>{
  //   console.log(ele);
  //   this.i1 = ele;
  // })
  // this.api.billvalues2.subscribe((ele:any)=>{
  //   console.log(ele);
  //   this.i2 = ele;
  // })

  //  this.api.termspec.subscribe(myele=>{
     
  //   this.val = myele[this.i]
  //   console.log(this.val);
  //  })
  //  this.api.busspec.subscribe(myele1=>{
     
  //   this.val = myele1[this.i1]
  //   console.log(this.val);
  //  })
  //  this.api.otherspec.subscribe(myele2=>{
     
  //   this.val = myele2[this.i2]
  //   console.log(this.val);
  //  })
    
  // }

  //  bill(){

  //  }

