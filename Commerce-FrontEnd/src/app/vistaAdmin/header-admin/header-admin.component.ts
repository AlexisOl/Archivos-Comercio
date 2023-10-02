import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit{


  constructor(private sesionActiva: SesionServicioService, private router: Router ) {}

   cerrarSesion() {
    this.sesionActiva.eliminarUsuario();
    this.router.navigate(['./inicio'])
  }

  reporteHistorialDescuento() {
    this.router.navigate(['generalAdmin/historialDescuento']);
  }

  reporteClienteDineroGastado(){
    this.router.navigate(['generalAdmin/historialClientesMasGastado'])
  }
  reporteMaxVentas(){
    this.router.navigate(['generalAdmin/historialMaximasVentas'])
  }

  reporteMaxSucursal(){
    this.router.navigate(['generalAdmin/historialMaximaSucursal'])
  }

  reporteArticuloMasVendido(){
    this.router.navigate(['generalAdmin/historialArticuloMasVendido'])
  }


  ingresoEmpelados(){
    this.router.navigate(['generalAdmin/ingresoEmpleados'])
  }

  controlTarjetas(){
    this.router.navigate(['generalAdmin/controlTarjetas'])
  }




  ngOnInit(): void {
  }
}
