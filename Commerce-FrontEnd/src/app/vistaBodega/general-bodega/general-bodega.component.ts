import { Component, OnInit } from '@angular/core';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-general-bodega',
  templateUrl: './general-bodega.component.html',
  styleUrls: ['./general-bodega.component.css']
})
export class GeneralBodegaComponent implements OnInit {
  constructor(private sesionActiva: SesionServicioService){}
ngOnInit(): void {
  this.usuario = this.sesionActiva.getUsuario();
}
usuario: any;



}
