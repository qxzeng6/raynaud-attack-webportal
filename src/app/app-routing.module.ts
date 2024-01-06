import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import {PatientListComponent } from './patient-list/patient-list.component';
import {PartientDetailComponent } from './partient-detail/partient-detail.component';
const routes: Routes = [
  {path:'hello', component: HelloComponent},
  {path:'partient-list', component: PatientListComponent},
  {path:'partient-list/:userName', component: PartientDetailComponent},
  {path:'', redirectTo:'/hello', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
