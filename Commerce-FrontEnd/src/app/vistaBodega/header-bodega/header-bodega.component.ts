import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-header-bodega',
  templateUrl: './header-bodega.component.html',
  styleUrls: ['./header-bodega.component.css']
})
export class HeaderBodegaComponent implements OnInit{


  constructor(private sesionActiva: SesionServicioService, private router: Router ) {}

   cerrarSesion() {
    this.sesionActiva.eliminarUsuario();
    this.router.navigate(['./inicio'])
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
