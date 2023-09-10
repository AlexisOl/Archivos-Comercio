import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginIngresoService } from 'src/app/services/login-ingreso.service';
import { SesionServicioService } from 'src/app/services/sesion-servicio.service';
import { usuarios } from 'src/modelos/usuarios';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-general-cajero',
  templateUrl: './general-cajero.component.html',
  styleUrls: ['./general-cajero.component.css']
})




export class GeneralCajeroComponent implements OnInit {

  public usuario: any;
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
    dataSource = ELEMENT_DATA;

  constructor(private httpclient: HttpClient,
              private sesion: LoginIngresoService,
              private sesionActiva: SesionServicioService){

  }
  ngOnInit(): void {
    this.usuario = this.sesionActiva.getUsuario();
    console.log(this.usuario);

  }
/*
  getRoles(){
    this.httpclient.get<any>('http://localhost:8080/roles').subscribe(
      response=> {
        console.log(response);
        this.usuario = response;
      }
    );
  }*/
}
