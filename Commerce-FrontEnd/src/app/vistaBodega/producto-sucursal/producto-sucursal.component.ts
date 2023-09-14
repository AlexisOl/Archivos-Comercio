import { Component, OnInit } from '@angular/core';
import { BodegaServicioService } from 'src/app/services/bodega-servicio.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { producto } from 'src/modelos/producto';

@Component({
  selector: 'app-producto-sucursal',
  templateUrl: './producto-sucursal.component.html',
  styleUrls: ['./producto-sucursal.component.css']
})
export class ProductoSucursalComponent implements OnInit{

  valor:any;
  idProducto: any;
  nombreProducto = '';
  cantidadProducto = 0;
  fechaProducto:any;


  idSucursal = this.sesionActiva.getUsuario()?.id_sucursal;

  constructor(private sesionActiva: SesionServicioService, private sesionBodega: BodegaServicioService){}


//metodo para ingreso de asigancion de productos
  asigacionProducto():void {
    const nuevoProducto: asigancionProductos = new asigancionProductos();

    //ingreso valores
    nuevoProducto.cantidad = this.cantidadProducto;
    nuevoProducto.fecha = this.fechaProducto;
    nuevoProducto.id_producto = this.idProducto
    nuevoProducto.id_sucursal = this.idSucursal;
    console.log(nuevoProducto.cantidad, nuevoProducto.fecha, nuevoProducto.id_sucursal, nuevoProducto.id_producto);

    this.sesionBodega.ingresoElementosTienda(nuevoProducto).subscribe(
      (producto: asigancionProductos) => {

       console.log(producto.id);

       console.log(producto.cantidad);

        if (producto && producto.id_producto !== undefined && producto.id_sucursal !== undefined) {
          // El producto se ingresó con éxito, puedes realizar acciones adicionales aquí
          console.log('Ingreso exitoso');

          // redirección y fin de proceso
        } else {
          console.log('No se pudo ingresar Correctamente', 'error');
        }
      },

      (error: any) => {
        console.log(error);
      }
    );
  }


  // metodo para buscar producto
  buscarProducto(): void {
    if (this.idProducto) {
      const id = parseInt(this.idProducto);
      // Llama al servicio para buscar el producto
      this.sesionBodega.buscarProducto(id).subscribe(
        (productoCreado: producto) => {
          console.log('encontrado:', productoCreado);
          this.nombreProducto = productoCreado.nombre;
          // Realiza otras acciones después de crear el producto si es necesario
        },
        (error) => {
          console.error('Error al buscar el producto:', error);
        }
      );
    }
  }

  ngOnInit(): void {

  }
}
