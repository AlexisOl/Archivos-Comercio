import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { AuthGuard } from 'src/app/utils/auth.guard';


const routes: Routes = [
  {path: '',
  component:GeneralAdminComponent,
  canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class adminmodule{}
