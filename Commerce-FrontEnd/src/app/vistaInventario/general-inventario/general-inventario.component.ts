import { Component, OnInit } from '@angular/core';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-general-inventario',
  templateUrl: './general-inventario.component.html',
  styleUrls: ['./general-inventario.component.css']
})
export class GeneralInventarioComponent implements OnInit {
  constructor(private sesionActiva: SesionServicioService){}
ngOnInit(): void {
  this.usuario = this.sesionActiva.getUsuario();
}
usuario: any;

}
