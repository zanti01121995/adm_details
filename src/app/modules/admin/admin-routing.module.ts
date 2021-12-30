import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { ProCardComponent } from './components/pro-card/pro-card.component';


const routes: Routes = [
  {path:'',component: DashBoardComponent,
children:[
  {path:'form',component:FormComponent},
  {path:'home',component:HomeComponent},
  {path:'profile',component:ProCardComponent},
  {path:'data',component:DataTableComponent},
  {path:'',redirectTo:'/admin/home',pathMatch:'full'}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
