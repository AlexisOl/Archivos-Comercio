import { Component, OnInit } from '@angular/core';
import { BodegaServicioService } from 'src/app/services/bodega-servicio.service';
import { InventarioServicioService } from 'src/app/services/inventario-servicio.service';
import { LoginIngresoService } from 'src/app/services/login-ingreso.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { producto } from 'src/modelos/producto';
import { productoInventario } from 'src/modelos/productoInventario';
import { usuarios } from 'src/modelos/usuarios';

@Component({
  selector: 'app-manejo-productos',
  templateUrl: './manejo-productos.component.html',
  styleUrls: ['./manejo-productos.component.css'],
})
export class ManejoProductosComponent implements OnInit {
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


  // metodo para buscar producto
  buscarProducto(): void {
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
    }
  }

  mostarId() {
    const nombre = this.servicioSucursal.getUsuario()?.nombre;
    const sucursal = this.servicioSucursal.getUsuario()?.id_sucursal;
    if (sucursal !== undefined && nombre !== undefined) {
      this.loginServicio.getId(nombre, sucursal).subscribe(
        (id: usuarios) => {
          console.log(nombre);
          console.log(sucursal);
          console.log(id.id);

          this.idEmpleado = id.id_rol;
        },
        (error) => {
          console.error('Error al buscar el producto:', error);
        }
      );
    }
  }
  imprimir() {
    console.log(this.idEmpleado);
  }

  //funcion para ingresar elementos-------------------------------------------
  ingresoInvetario() {
    // Verificar si idProductoBodega es un número entero válido
    const idProductoBodegaInt = parseInt(this.idProductoBodega);

    if (!isNaN(idProductoBodegaInt) && Number.isInteger(idProductoBodegaInt)) {
      // Es un número entero válido, procede con la solicitud
      const nuevoProductoInventario: productoInventario = new productoInventario();
      nuevoProductoInventario.cantidadInventario = this.cantidadProducto;
      nuevoProductoInventario.pasillo = this.pasilloProducto;
      nuevoProductoInventario.id_empleado = this.idEmpleado;
      nuevoProductoInventario.id_prod_bodega = idProductoBodegaInt;
      nuevoProductoInventario.estado = "en Inventario"

      console.log(nuevoProductoInventario.pasillo, nuevoProductoInventario.cantidadInventario, nuevoProductoInventario.id_prod_bodega, nuevoProductoInventario.id_empleado);

      this.servicioInventario.ingresoElementos(nuevoProductoInventario, this.servicioSucursal.getUsuario()?.id_sucursal).subscribe(
        (producto: productoInventario) => {
          if (producto && producto.id_empleado !== undefined && producto.id_prod_bodega !== undefined) {
            console.log('Ingreso exitoso');
          } else {
            console.log('No se pudo ingresar Correctamente', 'error');
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log('El código de producto en bodega debe ser un número entero válido.');
    }
  }


  ngOnInit(): void {
    this.usuarioGeneral = this.servicioSucursal.getUsuario();
    this.idEmpleado = this.usuarioGeneral.identificador;

    //  this.mostarId()
  }
}
