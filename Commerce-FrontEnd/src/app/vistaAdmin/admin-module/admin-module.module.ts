import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { ReporteHistorialDescuentosComponent } from '../reportes/reporte-historial-descuentos/reporte-historial-descuentos.component';


const routes: Routes = [
  {path: '',
  component:GeneralAdminComponent,
  canActivate: [AuthGuard]},
  {path: 'historialDescuento',
  component:ReporteHistorialDescuentosComponent,
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
