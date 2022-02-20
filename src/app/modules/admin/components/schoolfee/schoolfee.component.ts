import { Component, OnInit } from '@angular/core';

import { reduce } from 'rxjs/operators';
import { schoolfee } from './schoolfee.model';
import { FeesService } from 'src/app/services/fees.service'; 
import { Feestable1Component } from '../feestable1/feestable1.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { studentmodel } from '../form/student.model';


@Component({
  selector: 'app-schoolfee',
  templateUrl: './schoolfee.component.html',
  styleUrls: ['./schoolfee.component.scss']
})
export class SchoolfeeComponent implements OnInit {
  bal = 0;
  myobj:schoolfee =new schoolfee();
 
  constructor(public api:FeesService , private route:ActivatedRoute){}
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

    termfees:new FormArray([ new FormGroup({
      type:new FormControl(''),
      termfee:new FormControl(''),
      tpaiddate:new FormControl(''),
      tremarks:new FormControl('')
})]), 
    busfee:new FormArray([new FormGroup({
      monthtype:new FormControl(''),
      monthfee:new FormControl(''),
      mpaiddate:new FormControl(''),
      mremarks:new FormControl('')
})]),
    otherfee:new FormArray([new FormGroup({
      omonthtype:new FormControl(''),
      omonthfee:new FormControl(''),
      opaiddate:new FormControl(''),
      oremarks:new FormControl('')
})]),
        
    
})
  // public dialogRef: MatDialogRef<Feestable1Component>
  ngOnInit(): void {}
  
  

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
      console.log(data);
    })
   this.onClose();
   }

   updatevalue(){
    this.myobj = this.feesform.value;
    // this.myobj.name = this.api.feesform.value.name;
    // this.myobj.studentid = this.api.feesform.value.studentid;
    // this.myobj.standard =this.api.feesform.value.standard;
    // this.myobj.allotedfee = this.api.feesform.value.allotedfee;
    // this.myobj.termfees = this.api.feesform.value.termfees;
    // this.myobj.balance = this.api.feesform.value.balance;
    // this.myobj.busfee = this.api.feesform.value.busfee;
    // this.myobj.otherfee = this.api.feesform.value.otherfee;
    // this.myobj.allotedfee = this.api.feesform.value.allotedfee;
    // this.myobj.triptype = this.api.feesform.value.triptype;
    // this.myobj.allotedbusfee = this.api.feesform.value.allotedbusfee;
    // this.myobj.boardingpoint = this.api.feesform.value.boardingpoint;
    // this.myobj.selectedECA = this.api.feesform.value.selectedECA;
    // this.myobj.allotedECAfee = this.api.feesform.value.allotedECAfee;
    // this.myobj.type = this.api.feesform.value.type;
    // this.myobj.monthtype = this.api.feesform.value.monthtype;
    // this.myobj.omonthtype = this.api.feesform.value.omonthtype;
    // this.myobj.termfee = this.api.feesform.value.termfee;
    // this.myobj.monthfee = this.api.feesform.value.monthfee;
    // this.myobj.omonthfee = this.api.feesform.value.omonthfee;
    // this.myobj.tpaiddate = this.api.feesform.value.tpaiddate;
    // this.myobj.mpaiddate = this.api.feesform.value.mpaiddate;
    // this.myobj.opaiddate = this.api.feesform.value.opaiddate;
    // this.myobj.tremarks = this.api.feesform.value.tremarks;
    // this.myobj.mremarks = this.api.feesform.value.mremarks;
    // this.myobj.oremarks = this.api.feesform.value.oremarks;
    this.api.editvalue(this.myobj,this.myobj.id).subscribe(data=>{
      console.log(data)
      alert("updated")
    })
    this.onClose();
  }
  initializeFormGroup(){
    this.feesform.setValue({
        name:'',
        studentid:'',
        standard:'',
        allotedfee:'',
        term1:'',
        term2:'',
        term3:'',
        balance:''
    })
}
  onClose() {
    this.feesform.reset();
    this.initializeFormGroup();
    // this.dialogRef.close();
  }



}
