import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }
    from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaGeneralComponent } from './vistaClientes/vista-general/vista-general.component';
import { VistaComprasGeneralComponent } from './vistaClientes/vista-compras-general/vista-compras-general.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderCliComponent } from './vistaClientes/header-cli/header-cli.component';
import { CarritoUserComponent } from './vistaClientes/carrito-user/carrito-user.component';
import { LoginGeneralComponent } from './vistaAdmin/login-general/login-general.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralCajeroComponent } from './vistaCajero/general-cajero/general-cajero.component';
import { GeneralBodegaComponent } from './vistaBodega/general-bodega/general-bodega.component';
import { FooterComponent } from './utils/footer/footer.component';
import {MatTableModule} from '@angular/material/table';
import { HeaderCajeroComponent } from './vistaCajero/header-cajero/header-cajero.component';
import { HeaderBodegaComponent } from './vistaBodega/header-bodega/header-bodega.component';
import { GeneralAdminComponent } from './vistaAdmin/general-admin/general-admin.component';
import { GeneralInventarioComponent } from './vistaInventario/general-inventario/general-inventario.component';
import { HeaderAdminComponent } from './vistaAdmin/header-admin/header-admin.component';
import { HeaderInventarioComponent } from './vistaInventario/header-inventario/header-inventario.component';
import { IngresoProductosComponent } from './vistaBodega/ingreso-productos/ingreso-productos.component';
import { ManejoProductosComponent } from './vistaInventario/manejo-productos/manejo-productos.component';
import { ProductoSucursalComponent } from './vistaBodega/producto-sucursal/producto-sucursal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { VerProductosComponent } from './vistaBodega/ver-productos/ver-productos.component';
import { VistaProdBodegaComponent } from './vistaInventario/vista-prod-bodega/vista-prod-bodega.component';
import { DevolucionBodegaComponent } from './vistaInventario/devolucion-bodega/devolucion-bodega.component';
import {MatSliderModule} from '@angular/material/slider';
import { VistacomprasComponent } from './vistaCajero/vistacompras/vistacompras.component';
import { VerProductosSucursalComponent } from './vistaCajero/ver-productos-sucursal/ver-productos-sucursal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ElementosCardComponent } from './vistaCajero/elementos-card/elementos-card.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ModificarClienteComponent } from './vistaCajero/modificar-cliente/modificar-cliente.component';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { ReporteVentasGrandesComponent } from './vistaAdmin/reportes/reporte-ventas-grandes/reporte-ventas-grandes.component';
import { ReporteHistorialDescuentosComponent } from './vistaAdmin/reportes/reporte-historial-descuentos/reporte-historial-descuentos.component';
import { ReporteDineroSucursalesComponent } from './vistaAdmin/reportes/reporte-dinero-sucursales/reporte-dinero-sucursales.component';
import { ReporteArticulosVendidosComponent } from './vistaAdmin/reportes/reporte-articulos-vendidos/reporte-articulos-vendidos.component';
import { ReporteClientesDineroGastadoComponent } from './vistaAdmin/reportes/reporte-clientes-dinero-gastado/reporte-clientes-dinero-gastado.component';
import { ManejoEmpleadoComponent } from './vistaAdmin/manejo-empleado/manejo-empleado.component';
import { ManejoTarjetasComponent } from './vistaAdmin/manejo-tarjetas/manejo-tarjetas.component';
@NgModule({
  declarations: [
    AppComponent,
    VistaComprasGeneralComponent,
    HeaderCliComponent,
    CarritoUserComponent,
    LoginGeneralComponent,
    GeneralCajeroComponent,
    GeneralBodegaComponent,
    FooterComponent,
    HeaderCajeroComponent,
    VistaGeneralComponent,
    HeaderBodegaComponent,
    GeneralAdminComponent,
    GeneralInventarioComponent,
    HeaderAdminComponent,
    HeaderInventarioComponent,
    IngresoProductosComponent,
    ManejoProductosComponent,
    ProductoSucursalComponent,
    VerProductosComponent,
    VistaProdBodegaComponent,
    DevolucionBodegaComponent,
    VistacomprasComponent,
    VerProductosSucursalComponent,
    ElementosCardComponent,
    ModificarClienteComponent,
    ReporteVentasGrandesComponent,
    ReporteHistorialDescuentosComponent,
    ReporteDineroSucursalesComponent,
    ReporteArticulosVendidosComponent,
    ReporteClientesDineroGastadoComponent,
    ManejoEmpleadoComponent,
    ManejoTarjetasComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatGridListModule,
    MatStepperModule,
    MatInputModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
