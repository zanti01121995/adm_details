import { Component, OnInit } from '@angular/core';

import { reduce } from 'rxjs/operators';
import { schoolfee } from './schoolfee.model';
import { FeesService } from 'src/app/services/fees.service'; 
import { Feestable1Component } from '../feestable1/feestable1.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schoolfee',
  templateUrl: './schoolfee.component.html',
  styleUrls: ['./schoolfee.component.scss']
})
export class SchoolfeeComponent implements OnInit {
  bal = 0;
  
  myobj:schoolfee =new schoolfee();
 
  constructor(public api:FeesService){}
  // public dialogRef: MatDialogRef<Feestable1Component>
  ngOnInit(): void {
    
  }

    get schoolfee() {
      return (<FormArray>this.api.feesform.get('termfees')).controls;
    }

    get busfees() {
      return (<FormArray>this.api.feesform.get('busfee')).controls;
    }
    get otherfees() {
      return (<FormArray>this.api.feesform.get('otherfee')).controls;
    }
   
    addschoolfee() {
      const control =  new FormGroup({
                    type:new FormControl(''),
                    termfee:new FormControl(''),
                    tpaiddate:new FormControl(''),
                    tremarks:new FormControl('')
             });
      (<FormArray>this.api.feesform.get('termfees')).push(control);

    }
    


    addbusfee(){
      const control1 =  new FormGroup({
                    monthtype:new FormControl(''),
                    monthfee:new FormControl(''),
                    mpaiddate:new FormControl(''),
                    mremarks:new FormControl('')
             });
  
      (<FormArray>this.api.feesform.get('busfee')).push(control1);
    }
    otherfee(){
      const control2 =  new FormGroup({
                    omonthtype:new FormControl(''),
                    omonthfee:new FormControl(''),
                    opaiddate:new FormControl(''),
                    oremarks:new FormControl('')
             });
      (<FormArray>this.api.feesform.get('otherfee')).push(control2);
    }
    // removeschoolfee(index:any){
    //   const control = <FormArray>this.api.feesform.controls['tAmount'];
    //   control.removeAt(index);

    // }
  postvalues(){
    this.myobj = this.api.feesform.value;
  let totalTermFeesPaid = 0;
    this.api.feesform.value.termfees.forEach((element:any) => {
      if(element.termfee){
        totalTermFeesPaid = totalTermFeesPaid +  (element.termfee * 1);
      }
    });
    this.myobj.totalTermFeesPaid = totalTermFeesPaid;
    this.api.sendvalue(this.myobj).subscribe(data=>{
      console.log(data);
    })
   this.onClose();
   }
   updatevalue(){
    
    this.myobj.name = this.api.feesform.value.name;
    this.myobj.studentid = this.api.feesform.value.studentid;
    this.myobj.standard =this.api.feesform.value.standard;
    this.myobj.allotedfee = this.api.feesform.value.allotedfee;
    this.myobj.termfees = this.api.feesform.value.termfees;
    this.myobj.balance = this.api.feesform.value.balance;
    this.myobj.busfee = this.api.feesform.value.busfee;
    this.myobj.otherfee = this.api.feesform.value.otherfee;
    this.myobj.allotedfee = this.api.feesform.value.allotedfee;
    this.myobj.triptype = this.api.feesform.value.triptype;
    this.myobj.allotedbusfee = this.api.feesform.value.allotedbusfee;
    this.myobj.boardingpoint = this.api.feesform.value.boardingpoint;
    this.myobj.selectedECA = this.api.feesform.value.selectedECA;
    this.myobj.allotedECAfee = this.api.feesform.value.allotedECAfee;
    this.myobj.type = this.api.feesform.value.type;
    this.myobj.monthtype = this.api.feesform.value.monthtype;
    this.myobj.omonthtype = this.api.feesform.value.omonthtype;
    this.myobj.termfee = this.api.feesform.value.termfee;
    this.myobj.monthfee = this.api.feesform.value.monthfee;
    this.myobj.omonthfee = this.api.feesform.value.omonthfee;
    this.myobj.tpaiddate = this.api.feesform.value.tpaiddate;
    this.myobj.mpaiddate = this.api.feesform.value.mpaiddate;
    this.myobj.opaiddate = this.api.feesform.value.opaiddate;
    this.myobj.tremarks = this.api.feesform.value.tremarks;
    this.myobj.mremarks = this.api.feesform.value.mremarks;
    this.myobj.oremarks = this.api.feesform.value.oremarks;
    this.api.editvalue(this.myobj,this.myobj.id).subscribe(data=>{
      alert("updated")
    })
    this.onClose();
  }
  onClose() {
    this.api.feesform.reset();
    this.api.initializeFormGroup();
    // this.dialogRef.close();
  }



}
