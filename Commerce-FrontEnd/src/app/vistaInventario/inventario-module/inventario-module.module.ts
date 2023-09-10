import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { GeneralInventarioComponent } from '../general-inventario/general-inventario.component';




const routes: Routes = [
  {path: '',
  component:GeneralInventarioComponent,
  canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class inventarioModule { }
