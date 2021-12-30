import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import {AngularFireModule} from "@angular/fire/compat";
// import { AngularFireStorageModule } from "@angular/fire/compat/storage";
// import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  environment } from '../environments/environment';
import { LogInComponent } from './log-in/log-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ErrorComponent,
    ForgotComponent,
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,

    
    
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFireDatabaseModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
