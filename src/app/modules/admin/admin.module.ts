import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProCardComponent } from './components/pro-card/pro-card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DashBoardComponent,
    DataTableComponent,
    FormComponent,
    HomeComponent,
    NavBarComponent,
    ProCardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class AdminModule { }
