import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private dialog:MatDialog,private auth:AuthService) { }

  ngOnInit(): void {
  }
onadd(){
this.dialog.open(FormComponent)
}
onclick(){
  this.auth.logout()
    }
}
