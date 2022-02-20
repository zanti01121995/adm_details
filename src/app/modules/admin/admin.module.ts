import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
// import { DataTableComponent } from './components/data-table/data-table.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProCardComponent } from './components/pro-card/pro-card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolfeeComponent } from './components/schoolfee/schoolfee.component';
import { Feestable1Component } from './components/feestable1/feestable1.component';
import { UpdateComponent } from './components/update/update.component';
import { InvoicebillComponent } from './components/invoicebill/invoicebill.component';



@NgModule({
  declarations: [
    DashBoardComponent,
    // DataTableComponent,
    FormComponent,

    HomeComponent,
    NavBarComponent,
    ProCardComponent,
    SchoolfeeComponent,
    Feestable1Component,
    UpdateComponent,
    InvoicebillComponent
   

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class AdminModule { }
