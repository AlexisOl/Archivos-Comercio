import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { AuthGuard } from 'src/app/utils/auth.guard';
import { ReporteHistorialDescuentosComponent } from '../reportes/reporte-historial-descuentos/reporte-historial-descuentos.component';
import { ReporteClientesDineroGastadoComponent } from '../reportes/reporte-clientes-dinero-gastado/reporte-clientes-dinero-gastado.component';
import { ReporteVentasGrandesComponent } from '../reportes/reporte-ventas-grandes/reporte-ventas-grandes.component';
import { reporteVentaSucursal } from 'src/modelos/reporteVentaSucursal';
import { ReporteDineroSucursalesComponent } from '../reportes/reporte-dinero-sucursales/reporte-dinero-sucursales.component';
import { ReporteArticulosVendidosComponent } from '../reportes/reporte-articulos-vendidos/reporte-articulos-vendidos.component';
import { ManejoEmpleadoComponent } from '../manejo-empleado/manejo-empleado.component';
import { ManejoTarjetasComponent } from '../manejo-tarjetas/manejo-tarjetas.component';


const routes: Routes = [
  {path: '',
  component:GeneralAdminComponent,
  canActivate: [AuthGuard]},
  {path: 'historialDescuento',
  component:ReporteHistorialDescuentosComponent,
  canActivate: [AuthGuard]},
  {path: 'historialClientesMasGastado',
  component:ReporteClientesDineroGastadoComponent,
  canActivate: [AuthGuard]},
  {path: 'historialMaximasVentas',
  component:ReporteVentasGrandesComponent,
  canActivate: [AuthGuard]},
  {path: 'historialMaximaSucursal',
  component:ReporteDineroSucursalesComponent,
  canActivate: [AuthGuard]},
  {path: 'historialArticuloMasVendido',
  component:ReporteArticulosVendidosComponent,
  canActivate: [AuthGuard]},
  {path: 'ingresoEmpleados',
  component:ManejoEmpleadoComponent,
  canActivate: [AuthGuard]},
  {path: 'controlTarjetas',
  component:ManejoTarjetasComponent,
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
