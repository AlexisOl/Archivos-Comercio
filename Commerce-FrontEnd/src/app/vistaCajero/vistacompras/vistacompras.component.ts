import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CajeroServiceService } from 'src/app/services/cajero-service.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { cliente } from 'src/modelos/cliente';
import { producto } from 'src/modelos/producto';
import { productoCombinadoVenta } from 'src/modelos/productoCombinadoVenta';
import { productoInventario } from 'src/modelos/productoInventario';
import { tarjetas } from 'src/modelos/tarjetas';

@Component({
  selector: 'app-vistacompras',
  templateUrl: './vistacompras.component.html',
  styleUrls: ['./vistacompras.component.css'],
})
export class VistacomprasComponent implements OnInit {





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
  nombreCliente:any;
  // variables de los clientes
  noExiste!: boolean;
  buscandoCliente: boolean = false;

  // generacion local del cliente
  nitGeneral:any;
  nombreGeneral:any;
  valorClienteUso:any;

  // generacion local para los cajeros
  usuarioGeneral:any
  id_cajero:any;
  cajaCajero:any

  //generacion local de productos venta:
  cantidadPagarParcial:any
  cantidadPagarTotal:any

  //---------
  // para la vista de los elementos de la tabla  ---- 2 evento
  objetosLista: any;
  objetosFinalVenta:any;
  objestosListaInventario:any
  listadoProductos: any;
  listadoInventario:any;
  listadoBodega:any;
  cantidadProductoVenta:number=0;


  ngOnInit(): void {
    this.usuarioGeneral= this.servicio.getUsuario();



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
            console.log("Elemento a agregar:", element3);

            // Crear un nuevo objeto 'productoCombinadoVenta'
            const productoCombinado:productoCombinadoVenta = new  productoCombinadoVenta();



            productoCombinado.identificadoInventario=element3.identificador;
            productoCombinado.identificadorProducto= element1.identificador;
            productoCombinado.nombreProducto= element1.nombre;
            productoCombinado.precioProducto= element1.precio;
            productoCombinado.pasillo= element3.pasillo;
            productoCombinado.cantidadSolicitud= element3.cantidadgeneral;
            productoCombinado.cantidadaVender =1;


            console.log(
              productoCombinado.precioProducto,
              productoCombinado.nombreProducto,
              productoCombinado.pasillo,
              productoCombinado.cantidadSolicitud,

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
    generacionCliente.cantidadGastado=0;
    generacionCliente.nit=this.nitCliente;
    generacionCliente.nombre = this.nombreCliente;
    this.valorClienteUso=1;

    //generacion del post / insert
    this.clieteServicio.ingresoCliente(generacionCliente).subscribe(
    );
  }
  ///////////////////////////////////////////////////////////////////



  imprimirValoresInput(){
    this.objetosLista.forEach((elemento:any)=> {
      console.log(elemento.cantidadaVender);
      console.log(elemento);
    })
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
        this.valorClienteUso=0;

        this.noExiste = false;
      },
      (error) => {
        this.noExiste = true;
      }
    );
  }

  //para que cierre la alerta
  cerrarAlerta() {
    // Cierra la alerta utilizando la referencia al elemento DOM
    this.alertBox.nativeElement.style.display = 'none';
  }

  // ingreso elementos finales
  obtencionElementosFinales(){
    console.log(this.servicio.getUsuario());

    //obtencion de los clientes:
    if(this.nombreClienteEncotrado===undefined && this.nombreClienteEncotrado=== undefined) {
      console.log('no se puede generar ingreso');

    } else if(this.valorClienteUso ===1) {
      this.nombreGeneral = this.nombreCliente;

    } else if(this.valorClienteUso===0){
      this.nombreGeneral = this.nombreClienteEncotrado;
    }
    // obtencion de los elementos de cajejo:
   // this.id_cajero= this.servicio.getUsuario()?.identificador;
    this.cajaCajero = this.usuarioGeneral.nombre;
    this.id_cajero = this.usuarioGeneral.identificador;
    this.cantidadPagarParcial=this.generacionCantidadPagoParcial();
    this.tipoTarjeta();

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

  tipoTarjeta() {
    this.clieteServicio.buscarCliente(this.nitCliente).subscribe(
      (cliente: cliente | null) => {
        if (cliente !== null && cliente.descuentos !== null) {
          console.log(cliente.descuentos);
          console.log(cliente);
          if (cliente.descuentos===undefined) {
            console.log('tarjeta comun valor ', 1);

          } else {
            this.clieteServicio.obtenerTarjetas(cliente.descuentos).subscribe(
              (tarjeta: tarjetas) => {
                console.log(tarjeta);


              }
            );
          }

        }
      }
    );
  }

  //funcion para la cantidad Total de pago

  obtencionPuntos():number {
    let cantidadPago= 0;

    let valorParcial = this.cantidadPagarParcial;




    return cantidadPago;
  }

  ///---------------------------
  // para obtener los productos de tienda (solo inventario)
  obtenerElementosdeInventario(){
    this.clieteServicio.buscarProductoBodega(this.servicio.getUsuario()?.id_sucursal).subscribe(
      (result)=> {
        this.listadoProductos = result.productos;
        this.listadoInventario = result.inventario;
        this.listadoBodega=result.bodega;

      }
    );

  }


}
