import { Component, OnInit } from '@angular/core';
import { FeesService } from 'src/app/services/fees.service';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-invoicebill',
  templateUrl: './invoicebill.component.html',
  styleUrls: ['./invoicebill.component.scss']
})
export class InvoicebillComponent implements OnInit {
stud!:any;


myDate:any = new Date();
  constructor(private api:FeesService,private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   }


mydata:any;

  ngOnInit(): void {
    
    this.api.values.subscribe(data=>{
      console.log(data);
      this.stud = data;
    })
  //  this.api.commonBill.subscribe(data=>{console.log(data)})
    this.Receivedvalues();
   
  }
 
  index = ["feestype","description","amount"]
  Receivedvalues(){
 
     this.api.commonBill.subscribe(data=>{
       console.log(data)
      this.mydata =data;
     
     
   
     })
    
 }

 
getTotalCost() {
  return this.mydata.map((t:any) => t.amount*1).reduce((acc:any, value:any ) => acc + value, 0);
}

}
  

   
 
 
 