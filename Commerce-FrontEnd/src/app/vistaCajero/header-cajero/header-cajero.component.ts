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

   cerrarSesion() {
    this.sesionActiva.eliminarUsuario();
    this.router.navigate(['./inicio'])
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
