import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { Feestable1Component } from './components/feestable1/feestable1.component';
// import { DataTableComponent } from './components/data-table/data-table.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { ProCardComponent } from './components/pro-card/pro-card.component';
import { SchoolfeeComponent } from './components/schoolfee/schoolfee.component';


const routes: Routes = [
  {path:'',component: DashBoardComponent,
children:[
  {path:'form',component:FormComponent},
  {path:'home',component:HomeComponent},
  {path:'profile',component:ProCardComponent},
  {path:'data',component:DataTableComponent},
 {path:'schoolfee',component:SchoolfeeComponent},
  {path:'feestable1',component:Feestable1Component},
  {path:'',redirectTo:'/admin/home',pathMatch:'full'}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
