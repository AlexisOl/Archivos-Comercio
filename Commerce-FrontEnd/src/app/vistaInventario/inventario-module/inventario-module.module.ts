import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { GeneralInventarioComponent } from '../general-inventario/general-inventario.component';
import { ManejoProductosComponent } from '../manejo-productos/manejo-productos.component';




const routes: Routes = [
  {path: '',
  component:GeneralInventarioComponent,
  canActivate: [AuthGuard]},
  {path:'manejoProducto',
  component:ManejoProductosComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class inventarioModule { }
