import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { usuarios } from 'src/modelos/usuarios';

@Component({
  selector: 'app-manejo-empleado',
  templateUrl: './manejo-empleado.component.html',
  styleUrls: ['./manejo-empleado.component.css']
})
export class ManejoEmpleadoComponent implements OnInit {

  sucursal:any;
  nombre:any;
  password:any;
  rol:any;
  constructor(private servicio: AdminServiceService){}
  ingresoEmpelados(){
    if(this.sucursal, this.nombre, this.password, this.rol) {
      let usuario: usuarios= new usuarios();
      usuario.nombre = this.nombre;
      usuario.contrasenia = this.password;
      usuario.id_rol = this.rol;
      usuario.id = null;
      usuario.id_sucursal= this.sucursal;
      this.servicio.ingresoEmpleados(usuario).subscribe();
    }
  }

  ngOnInit(): void {
  }
}
