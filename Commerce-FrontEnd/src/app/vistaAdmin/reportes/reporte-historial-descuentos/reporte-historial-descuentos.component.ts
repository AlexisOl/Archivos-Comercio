import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-reporte-historial-descuentos',
  templateUrl: './reporte-historial-descuentos.component.html',
  styleUrls: ['./reporte-historial-descuentos.component.css']
})
export class ReporteHistorialDescuentosComponent implements OnInit{

  valores:any;

  constructor(private adminServicio: AdminServiceService){}


  obtenerFacturas() {
    this.adminServicio.obtenerFacturas().subscribe(
      valorFactura=> {
       // if (valorFactura.total_descontado < valorFactura.total_global) {
          this.valores  = valorFactura;

       // }
      }
    );
  }


  ngOnInit(): void {this.obtenerFacturas(); }
}
