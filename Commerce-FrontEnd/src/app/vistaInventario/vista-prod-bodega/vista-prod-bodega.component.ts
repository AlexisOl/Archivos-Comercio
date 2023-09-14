import { Component, OnInit } from '@angular/core';
import { InventarioServicioService } from 'src/app/services/inventario-servicio.service';

@Component({
  selector: 'app-vista-prod-bodega',
  templateUrl: './vista-prod-bodega.component.html',
  styleUrls: ['./vista-prod-bodega.component.css']
})
export class VistaProdBodegaComponent implements OnInit{

  public valor: any;
  constructor(private inventarioSesion: InventarioServicioService){}

  verBodega() {
    this.inventarioSesion.verElementosBodega().subscribe(
      valores => {
        this.valor = valores;
        console.log('ingrso exitoso');

      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    )
  }
  ngOnInit(): void {this.verBodega();}
}

