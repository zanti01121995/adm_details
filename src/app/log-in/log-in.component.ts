import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginform!:FormGroup
  faLock = faLock
  constructor() { }

  ngOnInit(): void {
    this.loginform=new FormGroup({
      username:new FormControl('',[Validators.required,Validators.minLength(8)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }
onlogin(){

}
}
