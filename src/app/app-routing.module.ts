import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataTableComponent } from './modules/admin/components/data-table/data-table.component';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthGuard } from './guards/auth.guard';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {path: 'login', component:LogInComponent},
  {path: 'forgot-password', component:ForgotComponent},
  {path: '',redirectTo: '/login', pathMatch:'full'},
  {path:'admin',
  canActivate:[AuthGuard],
    loadChildren:()=> import('./modules/admin/admin.module').then((m)=>m.AdminModule) , 
},
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
