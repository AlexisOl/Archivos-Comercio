import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-reporte-clientes-dinero-gastado',
  templateUrl: './reporte-clientes-dinero-gastado.component.html',
  styleUrls: ['./reporte-clientes-dinero-gastado.component.css']
})
export class ReporteClientesDineroGastadoComponent implements OnInit{
  valores:any;
  constructor(private servicioCliente: AdminServiceService) {  }


  // funcion para obtener todos los cleintes
  verClientes() {
    this.servicioCliente.obtenerClientes().subscribe(
      valor => {
        this.valores = valor;
      }
    );
  }
  ngOnInit(): void { this.verClientes() }
}
