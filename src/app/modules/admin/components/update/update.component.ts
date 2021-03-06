import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { reduce } from 'rxjs/operators';

import { FeesService } from 'src/app/services/fees.service'; 
import { Feestable1Component } from '../feestable1/feestable1.component';
import { MatDialogRef } from '@angular/material/dialog';
import {  FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { studentmodel } from '../form/student.model';
import { schoolfee } from '../schoolfee/schoolfee.model';
import { billmodel } from './bill.model';
import { EventEmitter } from 'stream';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BillserveService } from 'src/app/services/billserve.service';
import { trigger } from '@angular/animations';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})


export class UpdateComponent implements OnInit {
  autoRenew = new FormControl();
  detailshide:boolean=true;
  ihide:boolean=false;
  bal = 0;
  myobj:schoolfee =new schoolfee();
  hider!:boolean;
  sh:boolean=false;
 var!:any;
 val!:any;
 v!:any;
 billvalues:any = [];
 filterName:any = [];
 Newbill:any;
 billnum:any=[];
 dummyvalues:any=[];
 verifyBill:any;

  constructor(private afs: AngularFirestore,public api:FeesService ,public api1:BillserveService,public fb:FormBuilder, private router:Router,private route:ActivatedRoute){}
  // public dialogRef: MatDialogRef<Feestable1Component>
  feesform:FormGroup = new FormGroup({
    name: new FormControl(''),
    id: new FormControl(''),
    studentid: new FormControl(''),
    standard:new FormControl(''),
    allotedfee:new FormControl(''),
    balance: new FormControl(''),
    triptype: new FormControl(''),
    allotedbusfee:new FormControl(''),
    boardingpoint:new FormControl(''),
    selectedECA:new FormControl(''),
    allotedECAfee:new FormControl(''),
    termfees:new FormArray([]), 
      busfee:new FormArray([]),
    otherfee:new FormArray([]),
        
    
})
  ngOnInit(): void {
    
    this.api.values.subscribe(data=>{
    this.verifyBill=data;
    //   this.termbill(data);
    //   // this.api.busbill(data);
    //   // this.api.otherbill(data)
     this.changevalue(data);
     this.generateBillid();
   })
  

   setTimeout(function () {(<HTMLElement>document.getElementById('trig')).click();}, 1000);
   setTimeout(function () {(<HTMLElement>document.getElementById('trig1')).click();}, 1000);
   setTimeout(function () {(<HTMLElement>document.getElementById('trig2')).click();}, 1000);
  }
  

  billcheck(event:any,i:any){
    this.indexhide();
    for(i=0;i<=12;i++){
      const v = (<HTMLInputElement>document.getElementById('billno'+i)).value;
    console.log(v)
      if(v!==''){
        (<HTMLInputElement>document.getElementById('type'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('typei'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('termfees'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('termfee'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('tpaiddate'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('tremarks'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('billno'+i)).readOnly = true
        
      
      }
      else{
        
        (<HTMLInputElement>document.getElementById('typei'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('type'+i)).style.display= "visible";
        (<HTMLInputElement>document.getElementById('termfee'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('tpaiddate'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('tremarks'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('billno'+i)).readOnly =false;
      }
    }
  }

  
  billcheck1(event:any,i:any){
    this.indexhide();
    for(i=0;i<=12;i++){
      const v = (<HTMLInputElement>document.getElementById('bbillno'+i)).value;
    console.log(v)
      if(v!==''){
        (<HTMLInputElement>document.getElementById('monthtype'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('busfees'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('monthtypei'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('monthfee'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('mpaiddate'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('mremarks'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('bbillno'+i)).readOnly = true
        
      
      }
      else{
        
        (<HTMLInputElement>document.getElementById('monthtypei'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('monthtype'+i)).style.display= "visible";
        (<HTMLInputElement>document.getElementById('monthfee'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('mpaiddate'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('mremarks'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('bbillno'+i)).readOnly =false;
      }
    }
  }
  
  billcheck2(event:any,i:any){
    this.indexhide();
    for(i=0;i<=12;i++){
      const v = (<HTMLInputElement>document.getElementById('obillno'+i)).value;
    console.log(v)
      if(v!==''){
        (<HTMLInputElement>document.getElementById('omonthtype'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('omonthtypei'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('otherfees'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('omonthfee'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('opaiddate'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('oremarks'+i)).readOnly = true;
        (<HTMLInputElement>document.getElementById('obillno'+i)).readOnly = true
        
      
      }
      else{
        
        (<HTMLInputElement>document.getElementById('omonthtypei'+i)).style.display= "none";
        (<HTMLInputElement>document.getElementById('omonthtype'+i)).style.display= "visible";
        (<HTMLInputElement>document.getElementById('omonthfee'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('opaiddate'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('oremarks'+i)).readOnly = false;
        (<HTMLInputElement>document.getElementById('obillno'+i)).readOnly =false;
      }
    }
  }
  
  

  // termbillclick(i:any){
  
  //  this.api.values.subscribe(data=>{
  //   this.var = data.termfees[i];
  //   this.api.commonBill.next({
  //     description: this.var.type,
  //     amount:this.var.termfee,
  //     date: this.var.tpaiddate
  //   });
  //   this.api.term.next(true);
  //    })   
  //    this.router.navigate(['./admin/invoice'])  
  //   }

  //   busbillclick(i:any){
  //     // this.router.navigate(['./admin/invoice/'+i])
  //      this.api.values.subscribe(data=>{
  //       this.var = data.busfee[i];
  //       this.api.commonBill.next({
  //         description: this.var.monthtype,
  //         amount:this.var.monthfee,
  //         date: this.var.mpaiddate
  //       })
  //       this.api.bus.next(true);
  //        })
  //        this.router.navigate(['./admin/invoice'])       
  //       }
        
  //       otherbillclick(i:any){
  //         // this.router.navigate(['./admin/invoice/'+i])
  //          this.api.values.subscribe(data=>{
  //           this.var = data.otherfee[i];
  //           this.api.commonBill.next({
  //             description: this.var.omonthtype,
  //             amount:this.var.omonthfee,
  //             date: this.var.opaiddate
  //           })
  //           this.api.other.next(true);
  //            })  
  //            this.router.navigate(['./admin/invoice'])     
  //           }
  //  termbill(dat:any){
  //   this.api.termspec.next(dat.termfees)
  // }
  //  onbillclick1(i:any){
  //   this.router.navigate(['./admin/invoice/'+i])
  
  //   this.api.billvalues1.next(i);
   
  //  }
  //  onbillclick2(i:any){
  //   this.router.navigate(['./admin/invoice/'+i])
   
   
  //   this.api.billvalues2.next(i);
   
  //  }
      
  

    get schoolfee() {
      return (<FormArray>this.feesform.get('termfees')).controls;
    }

    get busfees() {
      return (<FormArray>this.feesform.get('busfee')).controls;
    }
    get otherfees() {
      return (<FormArray>this.feesform.get('otherfee')).controls;
    }
   
    addschoolfee() {
     
      const control =  new FormGroup({
                    type:new FormControl(''),
                    termfee:new FormControl(''),
                    tpaiddate:new FormControl(''),
                    tremarks:new FormControl(''),
                    billno:new FormControl('')
             });
      (<FormArray>this.feesform.get('termfees')).push(control);
    
      setTimeout(function () {(<HTMLElement>document.getElementById('trig')).click();}, 500);
    }
    


    addbusfee(){

      const control1 =  new FormGroup({
                    monthtype:new FormControl(''),
                    monthfee:new FormControl(''),
                    mpaiddate:new FormControl(''),
                    mremarks:new FormControl(''),
                    billno:new FormControl('')
             });
  
      (<FormArray>this.feesform.get('busfee')).push(control1);
      setTimeout(function () {(<HTMLElement>document.getElementById('trig1')).click();}, 500);
    }
    otherfee(){
     
      const control2 =  new FormGroup({
                    omonthtype:new FormControl(''),
                    omonthfee:new FormControl(''),
                    opaiddate:new FormControl(''),
                    oremarks:new FormControl(''),
                  billno:new FormControl('')
             });
      (<FormArray>this.feesform.get('otherfee')).push(control2);
      setTimeout(function () {(<HTMLElement>document.getElementById('trig2')).click();}, 500);

    }
    // removeschoolfee(index:any){
    //   const control = <FormArray>this.api.feesform.controls['tAmount'];
    //   control.removeAt(index);

    // }
  postvalues(){
    this.myobj = this.feesform.value;
    let totalTermFeesPaid = 0;
    let totalBusFeesPaid = 0;
    let totalOtherFeesPaid = 0;

      this.feesform.value.termfees.forEach((element:any) => {
         if(element.termfee){
             totalTermFeesPaid = totalTermFeesPaid +  (element.termfee * 1);
                }
       });
       this.feesform.value.busfee.forEach((element:any) => {
        if(element.monthfee){
          totalBusFeesPaid =totalBusFeesPaid +  (element.monthfee * 1);
               }
      });
      this.feesform.value.otherfee.forEach((element:any) => {
        if(element.omonthfee){
          totalOtherFeesPaid =totalOtherFeesPaid +  (element.omonthfee * 1);
               }
      });
      

    this.myobj.totalTermFeesPaid = totalTermFeesPaid;
    console.log(totalTermFeesPaid);
    this.myobj.totalBusFeesPaid = totalBusFeesPaid;
    this.myobj.totalOtherFeesPaid = totalOtherFeesPaid;
    const amount1 = this.feesform.value.allotedfee;  
    
    const amount2 = this.feesform.value.allotedbusfee; 
    console.log(amount2);
    const amount3 = this.feesform.value.allotedECAfee; 
    console.log(amount3);
    this.myobj.balance = (amount1 *1)-totalTermFeesPaid;
    this.myobj.balance2 = (amount2 *1)-totalBusFeesPaid;
    this.myobj.balance3 = (amount3 *1)-totalOtherFeesPaid;


    // this.api.sendvalue(this.myobj).subscribe(data=>{
    //   // console.table(data);
    // })
   this.onClose();
   }

 

  changevalue(dat:any){
    this.myobj.id = dat.id;
    this.feesform.patchValue({...dat})
    // this.feesform.controls['id'].setValue(dat.id);
    // this.feesform.controls['name'].setValue(dat.name);
    // this.feesform.controls['standard'].setValue(dat.standard);
    // this.feesform.controls['studentid'].setValue(dat.studentid);
    // this.feesform.controls['balance'].setValue(dat.balance);
    // this.feesform.controls['allotedfee'].setValue(dat.allotedfee);
    // this.feesform.controls['triptype'].setValue(dat.triptype);
    // this.feesform.controls['allotedbusfee'].setValue(dat.allotedbusfee);
    // this.feesform.controls['boardingpoint'].setValue(dat.boardingpoint);
    // this.feesform.controls['selectedECA'].setValue(dat.selectedECA);
    // this.feesform.controls['allotedECAfee'].setValue(dat.allotedECAfee);
    this.feesform.setControl('termfees',this.setexistterm(dat.termfees));
    this.feesform.setControl('busfee',this.setexistbus(dat.busfee));
    this.feesform.setControl('otherfee',this.setexistother(dat.otherfee));
    
  }

  updatevalue(){
    this.myobj = this.feesform.value;
    console.log(this.myobj.id)
    console.log(this.feesform.value);
     
    //  this.api.editvalue(this.myobj,this.myobj.id).subscribe(data=>{
    //    console.log(data)
      this.api.updatedvalues.next(this.myobj);

      this.api.updateItem(this.myobj.id).then(()=>{
        
        this.billclick();
      });
      //  alert("updated")
      
    //  this.onClose();
   }

setexistterm(term:any):FormArray{

const formarray = new FormArray([]);

// console.log(term)
term.forEach((d:any)=>{
  formarray.push(this.fb.group({
    ...d
  }));
  
});
return formarray;
}


setexistbus(bus:any):FormArray{
  const formarray = new FormArray([]);
  bus.forEach((d:any)=>{
    formarray.push(this.fb.group({
      ...d
    }));
  });
  return formarray;
  
  }

  setexistother(other:any):FormArray{
    const formarray = new FormArray([]);
    other.forEach((d:any)=>{
      formarray.push(this.fb.group({
        // omonthtype:d.omonthtype,
        // omonthfee:d.omonthfee,
        // opaiddate:d.opaiddate,
        // oremarks:d.oremarks,
        ...d
      }));
    });
    return formarray;
    }

//   initializeFormGroup(){
//     this.feesform.setValue({
//         name:'',
//         studentid:'',
//         standard:'',
//         allotedfee:'',
//         triptype:'',
//         allotedbusfee:''
        
//         balance:''
//     })
// }


  onClose() {
    this.feesform.reset();
    // this.initializeFormGroup();
    // this.dialogRef.close();
  }

  termdetails(event:any,index: any) {
    this.generateBillid();
    this.api.values.subscribe(data=>{
      console.log(data)
      this.var = data.termfees[index];
      // console.log(this.var)
      if(event.target.checked){
        this.billvalues.push({
          name:data.name,
          studentid:data.studentid,
          termfees:index,
          feestype:'termfees',
          description: this.var.type,
          amount:this.var.termfee,
          billno:this.Newbill
        });
        console.log(this.billvalues);
       this.val = this.Newbill;
      console.log(this.Newbill);
       (<HTMLInputElement>document.getElementById('billno'+index)).value=this.val;
       this.feesform.value.termfees[index].billno=this.val;
      //  const num:any = (<HTMLInputElement>document.getElementById('billno'+index)).value;
      //  console.log((num*1)+1);
        // console.log(this.billvalues)
      }
      else{
        let removeIndex = this.billvalues.findIndex((itm:any) => itm.termfees===index);
        (<HTMLInputElement>document.getElementById('billno'+index)).value='';
      if(removeIndex !== -1)
        this.billvalues.splice(removeIndex,1);
        console.log(this.billvalues)
      }
      
      // console.log(this.var)
      // (FormArrayName,this.var) 
      // console.log(this.billvalues)
  })}
  busdetails(event:any,index: any) {
    this.generateBillid();
    this.api.values.subscribe(data=>{
      this.var = data.busfee[index];
      if(event.target.checked){
        this.billvalues.push({
          name:data.name,
          studentid:data.studentid,
          busfees:index,
          feestype:'busfees',
          description: this.var.monthtype,
          amount:this.var.monthfee,
          billno:this.Newbill
         
        });
        console.log(this.billvalues)
        this.val = this.Newbill;
      
       (<HTMLInputElement>document.getElementById('bbillno'+index)).value=this.val;
       this.feesform.value.busfee[index].billno=this.val;
      }
      else{
        let removeIndex = this.billvalues.findIndex((itm:any) => itm.busfees===index);
        (<HTMLInputElement>document.getElementById('bbillno'+index)).value='';
      if(removeIndex !== -1)
        this.billvalues.splice(removeIndex,1);
          console.log(this.billvalues)
      }
    
  })}
  otherdetails(event:any,index: any) {
    
    (<HTMLInputElement>document.getElementById('obillno'+index)).value=this.Newbill;
    if(event.target.checked){
      this.v=this.feesform.value.otherfee[index]
      this.dummyvalues.push({amount:this.v.omonthfee,
      dec:this.v.omonthtype,
      billno:this.v.billno
    })
    
    }

  console.log(this.dummyvalues)
  
  //   this.api.values.subscribe(data=>{
  //     this.var = data.otherfee[index];
  //     if(event.target.checked){
  //       this.billvalues.push({
  //         name:data.name,
  //         studentid:data.studentid,
  //         otherfees:index,
  //         feestype:'otherfees',
  //         description: this.var.omonthtype,
  //         amount:this.var.omonthfee,
  //         billno:this.Newbill
          
  //       });

  //       console.log(this.billvalues)
  //       this.val = this.Newbill;
  //       console.log(this.Newbill);
      
  //      (<HTMLInputElement>document.getElementById('obillno'+index)).value=this.val;
  //      this.feesform.value.otherfee[index].billno=this.val;
  //     }
  //     else{
  //       let removeIndex = this.billvalues.findIndex((itm:any) => itm.otherfees===index);
  //       (<HTMLInputElement>document.getElementById('obillno'+index)).value='';
  //       if(removeIndex !== -1)
  //         this.billvalues.splice(removeIndex,1);
  //         console.log(this.billvalues)
  //     }
      
  // })
}
  

  billclick(){
    // this.generateBillid()
   console.log("genereted")
    this.api1.billdetails.next(Object.assign({},this.billvalues))
    this.api1.addItem();
    this.api.commonBill.next(this.billvalues)
    this.router.navigate(['./admin/invoice'])
    
     
  }
  generateBillid(){
   
      this.afs.
      collection<any>('bills', ref =>
        ref)
      .valueChanges({ idField: 'id' }).subscribe((data) => {
        data.forEach((e:any)=>this.filterName.push(e[0].billno*1))
    console.log(this.filterName);
    this.filterName.forEach((ele:any)=>this.billnum.push(ele*1));
    console.log( this.billnum)
    const largest = Math.max(...this.billnum);
    console.log(largest)
    this.Newbill = (largest*1)+1;
    console.log(this.Newbill)
   
    // this.billvalues.push({Newbill})
    // console.log(this.billvalues);
    // this.api.billno.controls['studid'].setValue(NewAdm);
  
    //     console.log(data);
    }
    );
  }
  hide(e:any){
    if(this.autoRenew.value==true){
      this.detailshide = false;
    }
    else{
      this.detailshide = true;
    }
    console.log(this.detailshide) 
}
indexhide(){
  if(this.autoRenew.value==true){
    this.ihide = false;
  }
  else{
    this.ihide = true;
  }
  console.log(this.ihide) 
}
getbill(){

}
}
// 