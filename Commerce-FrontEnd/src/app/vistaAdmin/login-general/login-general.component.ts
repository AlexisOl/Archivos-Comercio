import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginIngresoService } from '../../services/login-ingreso.service';
import { usuarios } from 'src/modelos/usuarios';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login-general',
  templateUrl: './login-general.component.html',
  styleUrls: ['./login-general.component.css'],
})
export class LoginGeneralComponent implements OnInit {
  processingRequest = false;
  nombre: any;
  password: any;

  //generacion del constructor

  constructor(
    private router: Router,
    private sesion: LoginIngresoService,
    private sesionActiva: SesionServicioService
  ) {}

  public generacionLogin() {
    //intento de ingreso
    this.processingRequest = true;
    //gheneracion del servicio

    this.sesion.getUsuario(this.nombre, this.password).subscribe(
      (user: usuarios) => {
        console.log(user);

        if (user && user.nombre && user.contrasenia) {
          if (
            user.nombre === this.nombre &&
            user.contrasenia === this.password
          ) {
            // El usuario se encontró, puedes realizar acciones adicionales aquí
            console.log('Ingreso exitoso');
            // redirrecion y fin de proceso
            this.processingRequest = false;
            this.sesionActiva.setUsuario(user);
            console.log(user);

            this.redireccionUsuarios(user);
          } else{
          console.log('No se pudo ingresar Correctamente', 'error');

          }
        } else {
          console.log('No se pudo ingresar Correctamente', 'error');
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // generacion del tipo de ususario
  public redireccionUsuarios(usuarios: usuarios) {
    switch (usuarios.id_rol) {
      case '1':
        //this.sesionActiva.setUsuario(usuarios)
        this.router.navigate(['/generalCajero']);

        break;
      case '2':
        //   this.sesionActiva.setUsuario(usuarios)
        this.router.navigate(['/generalBodega']);
        break;
      case '3':
        this.router.navigate(['/generalAdmin']);
        break;
      case '4':
        this.router.navigate(['/generalInventario']);

        break;
    }
  }

  ngOnInit(): void {}
}
