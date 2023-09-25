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
import { productoInventario } from 'src/modelos/productoInventario';

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
  buscarCliente: any;
  nombreClienteEncotrado: any;
  // variables de los clientes
  noExiste!: boolean;
  buscandoCliente: boolean = false;
  //---------
  // para la vista de los elementos de la tabla  ---- 2 evento
  objetosLista: any;
  objestosListaInventario:any
  listadoProductos: any;
  listadoInventario:any;
  listadoBodega:any;

  ngOnInit(): void {
    this.toppings.valueChanges.subscribe((selectedToppings) => {
      if (selectedToppings === null) {
        return; // Salir de la función si 'selectedToppings' es nulo
      }

      this.objetosLista = selectedToppings.slice(); // Copia el array existente

      this.listadoBodega.forEach((element2: any) => {
        this.listadoInventario.forEach((element3: any) => {
          if (
            this.objetosLista.some(
              (element1: any) => element1.identificador === element2.id_producto
            ) &&
            element2.identificador === element3.codigo_producto_bodega
          ) {
            console.log("Elemento a agregar:", element3);
            this.objetosLista.push(element3);
          }
        });
      });
    });
  }


  toppings = new FormControl('');



  //funcion de mostrar
  mostrar() {
    this.busacarCliente(this.buscarCliente);
    this.buscandoCliente = !this.buscandoCliente;
  }

  //funcion para busacr cliente:
  busacarCliente(nitCliete: any): void {
    this.clieteServicio.buscarCliente(nitCliete).subscribe(
      (clientes: cliente) => {
        console.log(clientes.nombre);

        this.nombreClienteEncotrado = clientes.nombre;
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
