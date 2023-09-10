import { Component, OnInit } from '@angular/core';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';

@Component({
  selector: 'app-general-admin',
  templateUrl: './general-admin.component.html',
  styleUrls: ['./general-admin.component.css']
})
export class GeneralAdminComponent implements OnInit {
  public usuario: any;

  constructor(private sesionActiva: SesionServicioService){}
ngOnInit(): void {
  this.usuario = this.sesionActiva.getUsuario();
  console.log(this.usuario);
}



}
