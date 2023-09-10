import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaGeneralComponent } from './vistaClientes/vista-general/vista-general.component';
import { VistaComprasGeneralComponent } from './vistaClientes/vista-compras-general/vista-compras-general.component';
import { CarritoUserComponent } from './vistaClientes/carrito-user/carrito-user.component';
import { LoginGeneralComponent } from './vistaAdmin/login-general/login-general.component';
import { GeneralBodegaComponent } from './vistaBodega/general-bodega/general-bodega.component';
import { GeneralCajeroComponent } from './vistaCajero/general-cajero/general-cajero.component';




//----rutas de angular:
const routes: Routes =[
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component:VistaGeneralComponent},
  {path: 'compras', component:VistaComprasGeneralComponent},
  {path: 'carrito', component:CarritoUserComponent},
  {path: 'login', component:LoginGeneralComponent},

  // para la parte del sistema general
  {path: 'generalBodega',
  loadChildren: () => import('./vistaBodega/bodega/bodega.module').then(m => m.BodegaModule) },
  {path: 'generalCajero',
  loadChildren: () => import('./vistaCajero/cajero/cajero.module').then(m => m.CajeroModule) },
  {path: 'generalAdmin',
  loadChildren: () => import('./vistaAdmin/admin-module/admin-module.module').then(m => m.adminmodule) },
  {path: 'generalInventario',
  loadChildren: () => import('./vistaInventario/inventario-module/inventario-module.module').then(m => m.inventarioModule) },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
