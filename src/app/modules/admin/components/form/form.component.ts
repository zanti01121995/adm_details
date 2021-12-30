import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validator } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  favoriteSeason: string = "";

  startDate = new Date(1990, 0, 1);
  selectedValue : string="";
 myvalue: string="";
 admform!:FormGroup
  constructor() { }

  ngOnInit(): void {
    this.admform = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      DOB: new FormControl(''),
      gender: new FormControl(''), 
      bloodgroup: new FormControl(''),
      father: new FormControl(''),
      mother: new FormControl(''),
      sadhaar: new FormControl(''),
      padhaar: new FormControl(''),
      guardian: new FormControl(''),
      contact: new FormControl(''),
      email: new FormControl(''),
      DOA: new FormControl(''),
      SOA: new FormControl(''),
      nation: new FormControl(''),
      religion: new FormControl(''),
      community: new FormControl(''),
      caste: new FormControl(''),
      address: new FormControl(''),
      pin: new FormControl(''),
      extra: new FormControl(''),
      studid: new FormControl('')
      
    });
  
  }
  onclick(){
    console.log(this.admform.value);
    }

}
