import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CajeroServiceService } from 'src/app/services/cajero-service.service';
import { cliente } from 'src/modelos/cliente';

@Component({
  selector: 'app-vistacompras',
  templateUrl: './vistacompras.component.html',
  styleUrls: ['./vistacompras.component.css'],
})
export class VistacomprasComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private clieteServicio: CajeroServiceService
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

  objetosLista: any;
  ngOnInit(): void {
    this.toppings.valueChanges.subscribe((selectedToppings) => {
      this.objetosLista = selectedToppings;
    });
  }
  toppings = new FormControl('');

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

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
}
