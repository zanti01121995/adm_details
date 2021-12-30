import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-card',
  templateUrl: './pro-card.component.html',
  styleUrls: ['./pro-card.component.scss']
})
export class ProCardComponent implements OnInit {
 name:string = "Virat Kohli"
 studentid:number=123456;
 DOB:string='11/11/1919'
 bloodbroup:string='O +ve'
 father:string="abcdef"
 mother:string="abcdef"
 guard:string="abcdef"
 padhaar:string="abcdef"
 sadhaar:string="abcdef"
 contact:string="abcdef"
 mail:string="abcdef"
 gender:string="abcdef"
 DOA:string="aaaaa"
 SOA:string="aaaaa"
 nation:string="aaaaa"
 religion:string="dddddd"
 community:string="qqqqqq"
 caste:string="mmmmm"
 extra:string="bbbbbb"
 address:string="nmkjhoihcwakjfskjbv"
 pin:number=1234568
  constructor() { }

  ngOnInit(): void {
  }

}
