import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-reporte-articulos-vendidos',
  templateUrl: './reporte-articulos-vendidos.component.html',
  styleUrls: ['./reporte-articulos-vendidos.component.css']
})
export class ReporteArticulosVendidosComponent implements OnInit{
  objetoFinal: any;
  valorBodega: any[] = [];

  constructor(private servicio: AdminServiceService) {}

  async obtenerElementosSumados() {
    try {
      this.objetoFinal = await this.servicio.obtenerCantidadGlobalDetalleFactura().toPromise();
    } catch (error) {
      console.error('Error al obtener cantidad global:', error);
    }
  }




  ngOnInit(): void {this.obtenerElementosSumados() }
}
