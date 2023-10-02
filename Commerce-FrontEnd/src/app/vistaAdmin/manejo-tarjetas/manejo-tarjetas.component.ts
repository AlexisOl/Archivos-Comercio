import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { cliente } from 'src/modelos/cliente';

@Component({
  selector: 'app-manejo-tarjetas',
  templateUrl: './manejo-tarjetas.component.html',
  styleUrls: ['./manejo-tarjetas.component.css']
})
export class ManejoTarjetasComponent  implements OnInit{
  objetoFinal:any

  constructor(private servicio:AdminServiceService){}

  verUsuarios(){
    this.servicio.obtenerClientes().subscribe((cliente:any)=> {
      this.objetoFinal= cliente
    });
  }


  tipoTarjeta(valor:number):string{
    let tipo='';
    if(valor <= 10000) {

    } else if (valor <= 20000) {

    } else if(valor <=30000) {

    } else {

    }
    return tipo;
  }
  ngOnInit(): void {
    this.verUsuarios();
  }
}


