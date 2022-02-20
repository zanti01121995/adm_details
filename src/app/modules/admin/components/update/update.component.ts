import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';

import { FeesService } from 'src/app/services/fees.service'; 
import { Feestable1Component } from '../feestable1/feestable1.component';
import { MatDialogRef } from '@angular/material/dialog';
import {  FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { studentmodel } from '../form/student.model';
import { schoolfee } from '../schoolfee/schoolfee.model';
import { billmodel } from './bill.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  bal = 0;
  myobj:schoolfee =new schoolfee();
 var!:any;
 
  constructor(public api:FeesService ,public fb:FormBuilder, private router:Router,private route:ActivatedRoute){}
  // public dialogRef: MatDialogRef<Feestable1Component>
  feesform:FormGroup = new FormGroup({
    name: new FormControl(''),
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
    
    //   this.termbill(data);
    //   // this.api.busbill(data);
    //   // this.api.otherbill(data)
     this.changevalue(data);
      
   })

  }
  

  termbillclick(i:any){
  
   this.api.values.subscribe(data=>{
    this.var = data.termfees[i];
    this.api.billvalues.next(this.var);
    this.api.term.next(true);
     })   
     this.router.navigate(['./admin/invoice'])  
    }

    busbillclick(i:any){
      // this.router.navigate(['./admin/invoice/'+i])
       this.api.values.subscribe(data=>{
        this.var = data.busfee[i];
        this.api.billvalues.next(this.var)
        this.api.bus.next(true);
         })
         this.router.navigate(['./admin/invoice'])       
        }
        
        otherbillclick(i:any){
          // this.router.navigate(['./admin/invoice/'+i])
           this.api.values.subscribe(data=>{
            this.var = data.otherfee[i];
            this.api.billvalues.next(this.var)
            this.api.other.next(true);
             })  
             this.router.navigate(['./admin/invoice'])     
            }
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
                    tremarks:new FormControl('')
             });
      (<FormArray>this.feesform.get('termfees')).push(control);

    }
    


    addbusfee(){
      const control1 =  new FormGroup({
                    monthtype:new FormControl(''),
                    monthfee:new FormControl(''),
                    mpaiddate:new FormControl(''),
                    mremarks:new FormControl('')
             });
  
      (<FormArray>this.feesform.get('busfee')).push(control1);
    }
    otherfee(){
      const control2 =  new FormGroup({
                    omonthtype:new FormControl(''),
                    omonthfee:new FormControl(''),
                    opaiddate:new FormControl(''),
                    oremarks:new FormControl('')
             });
      (<FormArray>this.feesform.get('otherfee')).push(control2);
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


    this.api.sendvalue(this.myobj).subscribe(data=>{
      // console.table(data);
    })
   this.onClose();
   }

 

  changevalue(dat:any){
    this.myobj.id = dat.id;
   
    this.feesform.controls['name'].setValue(dat.name);
    this.feesform.controls['standard'].setValue(dat.standard);
    this.feesform.controls['studentid'].setValue(dat.studentid);
    this.feesform.controls['balance'].setValue(dat.balance);
    this.feesform.controls['allotedfee'].setValue(dat.allotedfee);
    this.feesform.controls['triptype'].setValue(dat.triptype);
    this.feesform.controls['allotedbusfee'].setValue(dat.allotedbusfee);
    this.feesform.controls['boardingpoint'].setValue(dat.boardingpoint);
    this.feesform.controls['selectedECA'].setValue(dat.selectedECA);
    this.feesform.controls['allotedECAfee'].setValue(dat.allotedECAfee);
    this.feesform.setControl('termfees',this.setexistterm(dat.termfees));
    this.feesform.setControl('busfee',this.setexistbus(dat.busfee));
    this.feesform.setControl('otherfee',this.setexistother(dat.otherfee));
    
  }

  updatevalue(){
   console.log(this.myobj.id)
     this.myobj = this.feesform.value;
     
     this.api.editvalue(this.myobj,this.myobj.id).subscribe(data=>{
       console.log(data)
      
       alert("updated")
     })
     this.onClose();
   }

setexistterm(term:any):FormArray{

const formarray = new FormArray([]);

// console.log(term)
term.forEach((d:any)=>{
  formarray.push(this.fb.group({
    type:d.type,
    termfee:d.termfee,
    tpaiddate:d.tpaiddate,
    tremarks:d.tremarks
  }));
  
});
return formarray;
}


setexistbus(bus:any):FormArray{
  const formarray = new FormArray([]);
  bus.forEach((d:any)=>{
    formarray.push(this.fb.group({
      monthtype:d.monthtype,
      monthfee:d.monthfee,
      mpaiddate:d.mpaiddate,
      mremarks:d.mremarks,
    }));
  });
  return formarray;
  
  }

  setexistother(other:any):FormArray{
    const formarray = new FormArray([]);
    other.forEach((d:any)=>{
      formarray.push(this.fb.group({
        omonthtype:d.omonthtype,
        omonthfee:d.omonthfee,
        opaiddate:d.opaiddate,
        oremarks:d.oremarks
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



}
