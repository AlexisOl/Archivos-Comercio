import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-header-cajero',
  templateUrl: './header-cajero.component.html',
  styleUrls: ['./header-cajero.component.css']
})
export class HeaderCajeroComponent implements OnInit{


  constructor(private sesionActiva: SesionServicioService, private router: Router ) {}

  regresoGeneral(){
    this.router.navigate(['generalCajero'])
  }

   cerrarSesion() {
    this.sesionActiva.eliminarUsuario();
    this.router.navigate(['/inicio'])
  }

  irCompras(){
    this.router.navigate(['generalCajero/compras'])
  }

  vistaProductos(){
    this.router.navigate(['generalCajero/verProducto'])

  }


  ngOnInit(): void {
  }
}
