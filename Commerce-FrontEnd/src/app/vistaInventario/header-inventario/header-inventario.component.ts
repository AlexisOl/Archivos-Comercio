import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-header-inventario',
  templateUrl: './header-inventario.component.html',
  styleUrls: ['./header-inventario.component.css']
})
export class HeaderInventarioComponent implements OnInit{
  nombreUser: any

  constructor(private sesionActiva: SesionServicioService, private router: Router ) {}

   cerrarSesion() {
    this.sesionActiva.eliminarUsuario();
    this.router.navigate(['./inicio'])
  }

  general() {
    this.router.navigate(['generalInventario'])
  }

  manejoProducto() {
    this.router.navigate(['generalInventario/manejoProducto'])

  }

  vistaProductoInventario() {
    this.router.navigate(['generalInventario/vistaProductoInventarioBodega'])

  }



  ngOnInit(): void {
    this.nombreUser=this.sesionActiva.getUsuario()?.nombre

  }
}
