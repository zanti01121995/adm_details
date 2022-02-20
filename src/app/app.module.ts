import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { LogInComponent } from './log-in/log-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { DataTableComponent } from './modules/admin/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent } from './modules/admin/components/data-table/data-table.component';
import { DatePipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { FeesService } from './services/fees.service';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFirestore, AngularFirestoreModule  } from '@angular/fire/firestore';

// import { SchoolfeeComponent } from './modules/admin/components/schoolfee/schoolfee.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ErrorComponent,
    ForgotComponent,
    DataTableComponent,
    // DataTableComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,

    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,
    // AngularFire,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule
    // MatIconModule
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule

  ],
  providers: [AuthService, AngularFirestore, FeesService, DatePipe],
  bootstrap: [AppComponent],
  // entryComponents:[SchoolfeeComponent]

})
export class AppModule { }
