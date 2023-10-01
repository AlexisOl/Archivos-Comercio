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


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
