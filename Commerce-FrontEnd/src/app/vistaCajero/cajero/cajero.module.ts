import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralCajeroComponent } from '../general-cajero/general-cajero.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';

const routes: Routes = [
  {path: '', component:GeneralCajeroComponent,
  canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})


export class CajeroModule { }
