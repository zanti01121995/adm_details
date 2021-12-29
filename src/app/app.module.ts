import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import {AngularFireModule} from "@angular/fire/compat";
// import { AngularFireStorageModule } from "@angular/fire/compat/storage";
// import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormPopComponent } from './form-pop/form-pop.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {  environment } from '../environments/environment';
import { ProCardComponent } from './pro-card/pro-card.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    NavBarComponent,
    FormPopComponent,
    ProCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFireDatabaseModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormPopComponent]
})
export class AppModule { }
