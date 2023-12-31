import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-header-bodega',
  templateUrl: './header-bodega.component.html',
  styleUrls: ['./header-bodega.component.css']
})
export class HeaderBodegaComponent implements OnInit{
  public nombreUser: any;

  constructor(private sesionActiva: SesionServicioService, private router: Router ) {}

  //movimientos:
  ingresoProdutos() {
    this.router.navigate(['generalBodega/ingresoProductos'])
  }
    recargaBodega() {
      this.router.navigate(['generalBodega']);
    }

    ingresoProductoSucursal(){
      this.router.navigate(['generalBodega/productoaSucursal'])
    }

    ingresoTabla(){
      this.router.navigate(['generalBodega/vistaProductos'])
    }
   cerrarSesion() {
    this.sesionActiva.eliminarUsuario();
    this.router.navigate(['./inicio'])
  }

  ngOnInit(): void {
    this.nombreUser=this.sesionActiva.getUsuario()?.nombre

  }

}
