import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginform!:FormGroup
  faLock = faLock
  constructor(private auth :AuthService,private router: Router) { }

  ngOnInit(): void {
    this.loginform=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.minLength(8)]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }
onlogin(){
  if (this.loginform.valid) {
    this.auth.login(this.loginform.value).subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['admin']);
      },
      (err: Error) => {
        alert(err.message);
      }
    );
  }
}
}
