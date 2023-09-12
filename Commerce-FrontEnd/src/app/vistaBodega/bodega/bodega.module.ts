import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralBodegaComponent } from '../general-bodega/general-bodega.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { GeneralInventarioComponent } from 'src/app/vistaInventario/general-inventario/general-inventario.component';
import { IngresoProductosComponent } from '../ingreso-productos/ingreso-productos.component';

const routes: Routes = [
  {path: '',
  component:GeneralBodegaComponent,
  canActivate: [AuthGuard]},
  {path: 'ingresoProductos',
  component:IngresoProductosComponent,
  canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BodegaModule { }
