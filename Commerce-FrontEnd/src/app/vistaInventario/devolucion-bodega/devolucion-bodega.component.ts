import { Component, OnInit } from '@angular/core';
import { InventarioServicioService } from 'src/app/services/inventario-servicio.service';
import { LoginIngresoService } from 'src/app/services/login-ingreso.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { producto } from 'src/modelos/producto';
import { productoInventario } from 'src/modelos/productoInventario';

@Component({
  selector: 'app-devolucion-bodega',
  templateUrl: './devolucion-bodega.component.html',
  styleUrls: ['./devolucion-bodega.component.css']
})
export class DevolucionBodegaComponent implements OnInit {
  // para el slider
  disabled = false;
  max = 1;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  ///
  usuarioGeneral: any;
  valor: any;
  idProductoBodega: any;
  nombreProducto: any;
  cantidadProducto = 0;
  pasilloProducto: any;

  idEmpleado: any;

  constructor(
    private loginServicio: LoginIngresoService,
    private servicioInventario: InventarioServicioService,
    private servicioSucursal: SesionServicioService
  ) {}



  // funcion de devolucion
    devolucionProducto(){

    }

    //funcion de busqueda
    buscarProducto(){
      //busca prodcuto id en bodega
      if (this.idProductoBodega) {
        const id = parseInt(this.idProductoBodega);
        // Llama al servicio para buscar el producto
        this.servicioInventario.buscarProducto(id).subscribe(
          (productoCreado: asigancionProductos) => {
            console.log('encontrado:', productoCreado);
            this.nombreProducto = productoCreado.id_producto;
            // Realiza otras acciones después de crear el producto si es necesario
          },
          (error) => {
            console.error('Error al buscar el producto:', error);
          }
        );

        // ahora que hace eso busca para el slider
        this.servicioInventario.getCantidadProductoInventario(id).subscribe(
          (producto: any) => {
            this.max = producto.cantidadgeneral; // Asegúrate de que el nombre de propiedad sea correcto
            const estado = producto.estado_uso; // Asegúrate de que el nombre de propiedad sea correcto
            console.log("Respuesta del servidor:", producto);
            console.log("-------" + this.max + "------" + estado);
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
