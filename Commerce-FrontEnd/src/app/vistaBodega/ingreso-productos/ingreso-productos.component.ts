import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BodegaServicioService } from 'src/app/services/bodega-servicio.service';
import { LoginIngresoService } from 'src/app/services/login-ingreso.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { producto } from 'src/modelos/producto';
import { usuarios } from 'src/modelos/usuarios';

@Component({
  selector: 'app-ingreso-productos',
  templateUrl: './ingreso-productos.component.html',
  styleUrls: ['./ingreso-productos.component.css']
})
export class IngresoProductosComponent implements OnInit{

  loginform! : FormGroup;
  nombre = '';
  precio = 0;
  constructor(private http: HttpClient, private router: Router, private sesion: BodegaServicioService){

  }


  ingresoProducto(f: NgForm) {
    // generación de objeto
    console.log(f.value);

    // No necesitas crear un nuevo objeto producto, puedes usar f.value directamente
    const nuevoProduicto: producto = new producto();
    // Generación del servicio

    console.log(f.value.nombre);
    console.log(f.value.precio);
    const url = 'http://localhost:8080/api/user/guardarProducto';
    nuevoProduicto.nombre = f.value.nombre;
    nuevoProduicto.precio = f.value.precio;
    this.http.post(url, nuevoProduicto).subscribe((res) =>{
      this.ngOnInit();
    })
   /* this.sesion.guardarProducto(f.value).subscribe(
      (producto: producto) => {
        if (producto.nombre === undefined || producto.precio === undefined) {
          console.log('No se pudo ingresar Correctamente', 'error');
        } else {
          // El producto se ingresó con éxito, puedes realizar acciones adicionales aquí
          console.log('Ingreso exitoso');
          console.log(producto.nombre);

          // redirección y fin de proceso
        }
      },
      (error: any) => {
        console.log(error);
      }
    );*/
  }


  ngOnInit(): void {

  }

}
