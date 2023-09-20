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
  Cantidad = 0;
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
    // Función de búsqueda
buscarProducto() {
  if (this.idProductoBodega) {
    const id = parseInt(this.idProductoBodega);

    this.servicioInventario.buscarProducto(id).subscribe(
      (productoCreado: asigancionProductos) => {
        console.log('Producto encontrado:', productoCreado);
        this.nombreProducto = productoCreado.id_producto;
      },
      (error) => {
        console.error('Error al buscar el producto:', error);
      }
    );

    // Ahora busca la cantidad en inventario y actualiza this.Cantidad
    this.servicioInventario.getCantidadProductoInventario(id).subscribe(
      (producto: any) => {
        //genera el maximo
        this.max = producto.cantidadgeneral;


        const estado = producto.estado_uso;
        console.log("Respuesta del servidor:", producto);
        console.log("-------" + this.Cantidad + "------" + estado);
        console.log(this.Cantidad);
      },
      (error) => {
        console.error('Error al buscar el producto:', error);
      }
    );
  }
}


    generarDevolucion() {

        // llamo a mi servicio
        const cantidadADevolver = this.Cantidad;
        const productoDevolucion = this.idProductoBodega;

        this.servicioInventario.devolucionProductos(cantidadADevolver, productoDevolucion,this.idEmpleado, this.max).subscribe(

        );

    }

  ngOnInit(): void {
    this.idEmpleado = this.servicioSucursal.getUsuario()?.id_sucursal
  }
}
