import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { schoolfee } from '../modules/admin/components/schoolfee/schoolfee.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})


export class FeesService {
 
  constructor(private http:HttpClient){

  }
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
        
    //     busfee:new FormArray([
    //         new FormGroup({
    //             allotedbusfee:new FormControl(''),
            
    //         jan:new FormArray([
    //             new FormGroup({
    //                 janAmount:new FormControl(''),
    //                 janpaiddate:new FormControl(''),
    //                 janremarks:new FormControl('')
    //             })
    //         ]),
    //             feb:new FormArray([
    //                 new FormGroup({
    //                     febAmount:new FormControl(''),
    //                     febpaiddate:new FormControl(''),
    //                     febremarks:new FormControl('')
    //                 })
    //             ]),
    //                 mar:new FormArray([
    //                     new FormGroup({
    //                         marAmount:new FormControl(''),
    //                         marpaiddate:new FormControl(''),
    //                         marremarks:new FormControl('')
    //                     })
    //                 ]),
    //                     apr:new FormArray([
    //                         new FormGroup({
    //                             aprAmount:new FormControl(''),
    //                             aprpaiddate:new FormControl(''),
    //                             aprremarks:new FormControl('')
    //                         })
    //                     ]),
    //                         may:new FormArray([
    //                             new FormGroup({
    //                                 mayAmount:new FormControl(''),
    //                                 maypaiddate:new FormControl(''),
    //                                 mayremarks:new FormControl('')
    //                             })
    //                         ]),
    //                             jun:new FormArray([
    //                                 new FormGroup({
    //                                     junAmount:new FormControl(''),
    //                                     junpaiddate:new FormControl(''),
    //                                     junremarks:new FormControl('')
    //                                 })
    //                             ]),
    //                                 jul:new FormArray([
    //                                     new FormGroup({
    //                                         julAmount:new FormControl(''),
    //                                         julpaiddate:new FormControl(''),
    //                                         julremarks:new FormControl('')
    //                                     })
    //                                 ]),
    //                                     aug:new FormArray([
    //                                         new FormGroup({
    //                                             augAmount:new FormControl(''),
    //                                             augpaiddate:new FormControl(''),
    //                                             augremarks:new FormControl('')
    //                                         })
    //                                     ]),
    //                                         sep:new FormArray([
    //                                             new FormGroup({
    //                                                 sepAmount:new FormControl(''),
    //                                                 seppaiddate:new FormControl(''),
    //                                                 sepremarks:new FormControl('')
    //                                             })
    //                                         ]),
    //                                             oct:new FormArray([
    //                                                 new FormGroup({
    //                                                     octAmount:new FormControl(''),
    //                                                     octpaiddate:new FormControl(''),
    //                                                     octremarks:new FormControl('')
    //                                                 })
    //                                             ]),
    //                                                 nov:new FormArray([
    //                                                     new FormGroup({
    //                                                         novAmount:new FormControl(''),
    //                                                         novpaiddate:new FormControl(''),
    //                                                         novremarks:new FormControl('')
    //                                                     })
    //                                                 ]),
    //                                                     dec:new FormArray([
    //                                                         new FormGroup({
    //                                                             decAmount:new FormControl(''),
    //                                                             decpaiddate:new FormControl(''),
    //                                                             decremarks:new FormControl('')
    //                                                         })
    //                                                     ]),
        
                                                        
    //                                                 }),
    // ])
})

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
 sendvalue(save:any){
   return this.http.post('http://localhost:3000/posts',save);
   }

   getvalue(){
     return this.http.get<schoolfee[]>('http://localhost:3000/posts');
     }

   editvalue(save:any,id:number){
     return this.http.put<any>('http://localhost:3000/posts/'+id,save)
   }

   removevalue(id:any){
     return this.http.delete<any>('http://localhost:3000/posts/'+id)
   }


}
