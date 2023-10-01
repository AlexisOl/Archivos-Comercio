import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { min } from 'rxjs';
import { CajeroServiceService } from 'src/app/services/cajero-service.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { cliente } from 'src/modelos/cliente';
import { detallefacturas } from 'src/modelos/detalleFactura';
import { factura } from 'src/modelos/factura';
import { producto } from 'src/modelos/producto';
import { productoCombinadoVenta } from 'src/modelos/productoCombinadoVenta';
import { productoInventario } from 'src/modelos/productoInventario';
import { tarjetas } from 'src/modelos/tarjetas';
import { ventas } from 'src/modelos/ventas';

@Component({
  selector: 'app-vistacompras',
  templateUrl: './vistacompras.component.html',
  styleUrls: ['./vistacompras.component.css'],
})
export class VistacomprasComponent implements OnInit {
  descuentoFinal: number = 0;

  constructor(
    private form: FormBuilder,
    private clieteServicio: CajeroServiceService,
    private servicio: SesionServicioService
  ) {}

  firstFormGroup: FormGroup = this.form.group({
    buscarCliente: [''],

    firstCtrl: [''], // Agrega este control si no lo tienes
  });

  secondFormGroup: FormGroup = this.form.group({ secondCtrl: [''] });
  //llamo a clase y le asigno como referencia
  @ViewChild('alertBox') alertBox!: ElementRef;

  //variables del ng model
  nitCliente: any;
  nombreClienteEncotrado: any;
  nombreCliente: any;
  // variables de los clientes
  noExiste!: boolean;
  buscandoCliente: boolean = false;

  // generacion local del cliente -------------------------------------
  nitGeneral: any;
  nombreGeneral: any;
  valorClienteUso: any;

  // tajeta general
  tipoTarjetaValor: any;
  objetoTarjeta: any;
  //---------------------------------------------------------------------
  // generacion local para los cajeros
  usuarioGeneral: any;
  id_cajero: any;
  cajaCajero: any;
  fechaVenta: any;

  //generacion local de productos venta:
  cantidadPagarParcial: any;
  //solo de forma local
  cantidadPagarTotal: any;
  descuentoGenerado: any;

  //para mostrar en UI
  descuentoGeneradoUnico:any;

  //---------
  // para la vista de los elementos de la tabla  ---- 2 evento
  objetosLista: any;
  objetosFinalVenta: any;
  objestosListaInventario: any;
  listadoProductos: any;
  listadoInventario: any;
  listadoBodega: any;
  cantidadProductoVenta: number = 0;

  //// elementos botonoes
  generarBotonDescuento: boolean = false;

  // para venta final ya con descuento
  cantidadPuntosDescuento: any;

  ngOnInit(): void {
    this.usuarioGeneral = this.servicio.getUsuario();

    this.toppings.valueChanges.subscribe((selectedToppings) => {
      if (selectedToppings === null) {
        return; // Salir de la función si 'selectedToppings' es nulo
      }

      this.objetosLista = selectedToppings.slice(); // Copia el array existente

      this.listadoBodega.forEach((element2: any) => {
        this.listadoInventario.forEach((element3: any) => {
          const element1 = this.objetosLista.find(
            (item: any) => item.identificador === element2.id_producto
          );

          if (
            element1 &&
            element2.identificador === element3.codigo_producto_bodega
          ) {
            console.log('Elemento a agregar:', element3);

            // Crear un nuevo objeto 'productoCombinadoVenta'
            const productoCombinado: productoCombinadoVenta =
              new productoCombinadoVenta();

            productoCombinado.identificadoInventario = element3.identificador;
            productoCombinado.identificadorProducto = element1.identificador;
            productoCombinado.nombreProducto = element1.nombre;
            productoCombinado.precioProducto = element1.precio;
            productoCombinado.pasillo = element3.pasillo;
            productoCombinado.cantidadSolicitud = element3.cantidadgeneral;
            productoCombinado.cantidadaVender = 1;

            console.log(
              productoCombinado.precioProducto,
              productoCombinado.nombreProducto,
              productoCombinado.pasillo,
              productoCombinado.cantidadSolicitud
            );

            // Agregar el nuevo objeto a 'objetosLista'
            this.objetosLista.push(productoCombinado);
            console.log(this.objetosLista);
          }
        });
      });
    });
  }

  /*****************
   *
   *
   *
   * PARA LOS CLIENTES
   *
   */

  ingresarCliente() {
    console.log(this.nombreClienteEncotrado);
    console.log(this.nombreCliente);

    var generacionCliente: cliente = new cliente();
    generacionCliente.cantidadGastado = 0;
    generacionCliente.nit = this.nitCliente;
    generacionCliente.nombre = this.nombreCliente;
    generacionCliente.puntosganados = 0;
    this.valorClienteUso = 1;

    //generacion del post / insert
    this.clieteServicio.ingresoCliente(generacionCliente).subscribe();
  }
  ///////////////////////////////////////////////////////////////////

  imprimirValoresInput() {
    this.objetosLista.forEach((elemento: any) => {
      console.log(elemento.cantidadaVender);
      console.log(elemento);
    });
  }

  toppings = new FormControl('');

  //funcion de mostrar
  mostrar() {
    this.busacarCliente(this.nitCliente);
    this.buscandoCliente = !this.buscandoCliente;
  }

  //funcion para busacr cliente:
  busacarCliente(nitCliete: any): void {
    this.clieteServicio.buscarCliente(nitCliete).subscribe(
      (clientes: cliente) => {
        console.log(clientes.nombre);

        this.nombreClienteEncotrado = clientes.nombre;
        this.valorClienteUso = 0;
        this.cantidadPuntosDescuento = clientes.puntosganados;
        console.log(this.cantidadPuntosDescuento);

        this.noExiste = false;
      },
      (error) => {
        this.noExiste = true;
      }
    );
  }

  //para que cierre la alerta --------------------------------------
  cerrarAlerta() {
    // Cierra la alerta utilizando la referencia al elemento DOM
    this.alertBox.nativeElement.style.display = 'none';
  }

  // ingreso elementos finales ------------------------------------
  obtencionElementosFinales() {
    //this.tipoTarjeta();

    //obtencion de los clientes:
    if (
      this.nombreClienteEncotrado === undefined &&
      this.nombreCliente === undefined
    ) {
      console.log('no se puede generar ingreso');

    } else if (this.valorClienteUso === 1) {
      this.nombreGeneral = this.nombreCliente;
    } else if (this.valorClienteUso === 0) {
      this.nombreGeneral = this.nombreClienteEncotrado;
    }
    // obtencion de los elementos de cajejo:
    // this.id_cajero= this.servicio.getUsuario()?.identificador;
    this.cajaCajero = this.usuarioGeneral.contrasenia;
    this.id_cajero = this.usuarioGeneral.identificador;
    this.tipoTarjeta();
    this.cantidadPagarParcial = this.generacionCantidadPagoParcial();

    // ... otras propiedades que necesites
    console.log(this.descuentoGenerado);


    // this.descuentoGenerado = this.obtencionPuntos(this.cantidadPagarParcial);
  }

  //funcion para la cantidad de pago, parcial
  generacionCantidadPagoParcial(): number {
    let cantidadPago = 0;
    if (this.objetosLista !== undefined && this.objetosLista !== null) {
      this.objetosLista.forEach((element: any) => {
        const cantidad = parseInt(element.cantidadaVender);
        const precio = parseFloat(element.precioProducto);

        if (!isNaN(cantidad) && !isNaN(precio)) {
          cantidadPago += cantidad * precio;
        }
      });
    }

    console.log(cantidadPago);
    return cantidadPago;
  }

  //fucnion para obtener el tipo de tarjeta

  // ...
  async tipoTarjeta(): Promise<void> {
    let cantidadFinal = 0; // Inicializar cantidadFinal en 0
    //this.descuentoGenerado = 0;
    try {
      const cliente: cliente | undefined = await this.clieteServicio
        .buscarCliente(this.nitCliente)
        .toPromise();

      if (cliente !== undefined && cliente.descuentos !== null) {
        console.log(cliente.descuentos);
        console.log(cliente);
        if (cliente.descuentos === undefined) {
          console.log('Tarjeta común, valor 1');

          // Puedes agregar más lógica si es necesario para el caso de una tarjeta común.
        } else {
          if (cliente.descuentos === null) {
            cantidadFinal = this.cantidadPagarParcial;
          } else {
            const tarjeta: tarjetas | undefined = await this.clieteServicio
              .obtenerTarjetas(cliente.descuentos)
              .toPromise();

            if (tarjeta !== undefined) {
              this.objetoTarjeta = tarjeta;
              console.log('Tarjeta recibida:', this.objetoTarjeta);
              this.tipoTarjetaValor = tarjeta.tipo;
              cantidadFinal = this.obtencionPuntos(this.cantidadPagarParcial);
            } else {
              console.log('No se pudo obtener la tarjeta.');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error al obtener la tarjeta o cliente:', error);
    }

    this.descuentoGenerado = cantidadFinal;
    this.descuentoFinal = cantidadFinal;
    console.log(cantidadFinal);
    this.generarTotal();

  }

  // ...

  //funcion para la cantidad Total de pago

  obtencionPuntos(valorPagoParcial: number): number {
    let cantidadPago = 0;
    var cantidadPuntos = Math.min(
      valorPagoParcial / this.objetoTarjeta.cantidadbase
    );
    cantidadPago = cantidadPuntos * this.objetoTarjeta.cantidadpuntos;
    return cantidadPago;
  }

  ///---------------------------
  ///---------------------------
  ///---------------------------
  ///---------------------------
  // para obtener los productos de tienda (solo inventario)
  obtenerElementosdeInventario() {
    this.clieteServicio
      .buscarProductoBodega(this.servicio.getUsuario()?.id_sucursal)
      .subscribe((result) => {
        this.listadoProductos = result.productos;
        this.listadoInventario = result.inventario;
        this.listadoBodega = result.bodega;
      });
  }

  //funcion para eliminar los valores que escogio -----------------
  eliminardeInventario() {
    this.objetosLista.forEach((elemento: any) => {
      if (elemento.pasillo && elemento.cantidadaVender) {
        let identificadorElemento = elemento.identificadoInventario;
        let cantidad = elemento.cantidadaVender;
        this.clieteServicio
          .elimnarCantidadInventario(identificadorElemento, cantidad)
          .subscribe();
      }
    });
  }

  // funcion para generar la venta ----------------------------------

  generarVenta() {
    this.generarTotal();
    // si todo es no nulo lo hace
    if (this.generarBotonDescuento === false) {
      console.log('si da ', this.descuentoGenerado, this.cantidadPagarTotal);
      // lamo a la funcion de venta Metodo en base a los valores simples (sin aplicar descuento)
      this.ventaMetodo(this.nitCliente,
        this.nombreGeneral,
        this.cantidadPagarParcial,
        this.cantidadPagarParcial,
        this.fechaVenta,
        this.id_cajero
        );


        // servicio para que me actualice al cliente
        this.clieteServicio.actualizacionElementosCliente(this.cantidadPagarParcial, this.descuentoGenerado, this.nitCliente).subscribe();
    } else {
      if (
        (this.nitCliente,
        this.nombreGeneral,
        this.cajaCajero,
        this.id_cajero,
        this.cantidadPagarParcial,
        this.descuentoGenerado,
        this.cantidadPagarTotal,
        this.fechaVenta !== null && this.objetosLista !== null)
      ) {
        // llmado de metodo de ingreso Venta:

        this.actualizarPuntosGlobales();

        this.ventaMetodo(
            this.nitCliente,
            this.nombreGeneral,
            this.cantidadPagarParcial,
            this.cantidadPagarTotal,
            this.fechaVenta,
            this.id_cajero
          );
          //genero servicio de elementos de actualizacion de clientes
          this.clieteServicio.actualizacionElementosClienteconDescuento(this.cantidadPagarTotal,this.descuentoGenerado, this.nitCliente).subscribe();




      }
    }
  }

  // funcion para generar todas las transacciones de ventas
  ventaMetodo(nitcliente:string, nombregeneral:string, cantidadParcial:number, cantidadTotal:number,
    fechaventa:Date, idCajero:number ) {

      //genera la factura
      let facturaNueva: factura = new factura();
      facturaNueva.nit_cliente = nitcliente;
      facturaNueva.nombre_cliente = nombregeneral;
      facturaNueva.total_global = cantidadParcial;
      facturaNueva.total_descontado = cantidadTotal;
      facturaNueva.fecha_facturacion = fechaventa;

      // hago servicio para ingreso factura
      this.clieteServicio
        .ingresoFactura(facturaNueva)
        .subscribe((factura: factura) => {
          console.log('aaaaaaaaaaaaaa', factura);

          // ciclo en base al array
          this.objetosLista.forEach((objInventario: any) => {
            if (objInventario.pasillo) {
              //nuevo objeto
              let detalleFactura: detallefacturas = new detallefacturas();
              detalleFactura.identificadorFactura = factura.identificador;
              detalleFactura.identificador_producto_Inventario =
                objInventario.identificadoInventario;
              detalleFactura.nombre_producto = objInventario.nombreProducto;
              detalleFactura.cantidad = objInventario.cantidadaVender;
              detalleFactura.precio_especifico = objInventario.precioProducto;
              // servicio para ingreso de elementos
              this.clieteServicio
                .ingresoDetalleFactura(detalleFactura)
                .subscribe();
            }
          });
          //eliminacion de elementos del inventario
          this.eliminardeInventario();
          // por ultimo generacion de venta globa;
          // factura e id empelado
          let generacionVenta: ventas = new ventas();
          generacionVenta.identificador_empleado = idCajero;
          generacionVenta.identificador_factura = factura.identificador;
          this.clieteServicio.ingresoVenta(generacionVenta).subscribe();
        });
    }


  //funcion para que el boton muestre los descuentos --------------------
  generarPosiblesDescuentoBoton() {
    this.generarBotonDescuento = !this.generarBotonDescuento;
  }

  //funcion para generarTotal
  generarTotal(){
    this.cantidadPagarTotal = this.cantidadPagarParcial - this.descuentoGenerado;

  }

  //funcion obtencion de punntos para su uso
  actualizarPuntosGlobales() {

    // cambiar a descuento
    //solo uso lo de bodega
    this.descuentoGenerado=this.cantidadPuntosDescuento;
    if ((this.cantidadPagarParcial-this.descuentoGenerado) >=0) {
      console.log("a");

      this.cantidadPagarTotal = Math.abs(this.cantidadPagarParcial-this.descuentoGenerado);
      this.descuentoGenerado =0;
    } else {
      console.log("b");

      // como se que es menor solo le asigno a total
      this.descuentoGenerado = Math.abs(this.descuentoGenerado-this.cantidadPagarParcial);
      this.cantidadPagarTotal =0;

    }
    this.descuentoGeneradoUnico = this.descuentoGenerado;

  }
}
