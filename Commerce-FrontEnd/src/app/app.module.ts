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
import { VistaProductosComponent } from './vistaBodega/vista-productos/vista-productos.component';
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
    VistaProductosComponent,
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
