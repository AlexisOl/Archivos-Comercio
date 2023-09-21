import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralCajeroComponent } from '../general-cajero/general-cajero.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { VistacomprasComponent } from '../vistacompras/vistacompras.component';
import { VerProductosSucursalComponent } from '../ver-productos-sucursal/ver-productos-sucursal.component';

const routes: Routes = [
  {path: '', component:GeneralCajeroComponent,
  canActivate: [AuthGuard]},

  {path: 'compras', component:VistacomprasComponent,
  canActivate: [AuthGuard]},

  {path: 'verProducto', component: VerProductosSucursalComponent,
canActivate:[AuthGuard]}


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})


export class CajeroModule { }
