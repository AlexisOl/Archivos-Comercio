import { Component, OnInit } from '@angular/core';
import { BodegaServicioService } from 'src/app/services/bodega-servicio.service';
import { producto } from 'src/modelos/producto';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  public valor: any; // Cambia el tipo a producto

  constructor(private sesionBodega: BodegaServicioService) {}

  ngOnInit(): void {
    this.verTabla();
  }

  verTabla() {
    this.sesionBodega.obtenerProductos().subscribe(
      valoresNuevo => {
        this.valor = valoresNuevo
          // Manejar el caso en el que no se obtuvo ningún producto
          // Puedes mostrar un mensaje de error o realizar alguna otra acción
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  displayedColumns: string[] = ['id', 'nombre', 'precio'];
}
