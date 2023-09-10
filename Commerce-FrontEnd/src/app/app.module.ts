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
    GeneralInventarioComponent
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
