import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { usuarios } from 'src/modelos/usuarios';
import { Observable, ObservableInput, forkJoin } from 'rxjs';
import { reporteVentaSucursal } from 'src/modelos/reporteVentaSucursal';

@Component({
  selector: 'app-reporte-dinero-sucursales',
  templateUrl: './reporte-dinero-sucursales.component.html',
  styleUrls: ['./reporte-dinero-sucursales.component.css'],
})
export class ReporteDineroSucursalesComponent implements OnInit {
  valoresSucursal1: any;
  valoresSucursal2: any;
  valoresSucursal3: any;

  // para facturas:
  facturas1: any[] = [];
  facturas2: any[] = [];
  facturas3: any[] = [];

  //cantidades globales

  cantidadSucursal1: any;
  cantidadSucursal2: any;
  cantidadSucursal3: any;
  // para la sucrusal final
  objetoFinal: reporteVentaSucursal[] = [];

  constructor(private servicio: AdminServiceService) {}

  //funcion para obtener cada empleado cajero
  obtenerEmpleados() {
    const requests = [];
    for (let index = 1; index < 4; index++) {
      requests.push(this.servicio.obtenerUsuario(String(index)));
    }

    forkJoin(requests).subscribe((result) => {
      this.valoresSucursal1 = result[0];
      this.valoresSucursal2 = result[1];
      this.valoresSucursal3 = result[2];

      console.log(
        this.valoresSucursal1,
        this.valoresSucursal2,
        this.valoresSucursal3
      );
    });
  }

  // funcioo obtener facturas
  // funcioo obtener facturas
  obtenerFacturas() {
    const requests1: Observable<any>[] = [];
    const requests2: Observable<any>[] = [];
    const requests3: Observable<any>[] = [];

    for (let index = 1; index < 4; index++) {
      switch (index) {
        case 1:
          if (this.valoresSucursal1) {
            this.valoresSucursal1.forEach((empleado: any) => {
              requests1.push(
                this.servicio.obtenerFacturasPorUsuarioVenta(
                  empleado.identificador
                )
              );
            });
          }

          break;
        case 2:
          if (this.valoresSucursal2) {
            this.valoresSucursal2.forEach((empleado: any) => {
              requests2.push(
                this.servicio.obtenerFacturasPorUsuarioVenta(
                  empleado.identificador
                )
              );
            });
          }
          break;
        case 3:
          if (this.valoresSucursal3) {
            this.valoresSucursal3.forEach((empleado: any) => {
              requests3.push(
                this.servicio.obtenerFacturasPorUsuarioVenta(
                  empleado.identificador
                )
              );
            });
          }
          break;
      }
    }

    forkJoin(requests1).subscribe((result1) => {
      this.facturas1 = result1;
    });
    forkJoin(requests2).subscribe((result2) => {
      this.facturas2 = result2;
    });
    forkJoin(requests3).subscribe((result3) => {
      this.facturas3 = result3;
    });
    console.log(this.facturas1, this.facturas2, this.facturas3);
  }

  async verelementosFacturas() {
    let cantidadFinal = 0;

    for (const arr of this.facturas1) {
      for (const ele of arr) {
        try {
          const cantidad = await this.obtenerCantidadFacturas(
            parseInt(ele.identificador_factura)
          );
          cantidadFinal += cantidad;
          console.log('Cantidad parcial:', cantidadFinal);
        } catch (error) {
          console.error('Error obteniendo cantidad:', error);
        }
      }
    }

    this.cantidadSucursal1 = cantidadFinal;

    // para la 2
    let cantidadFinal2 = 0;

    for (const arr of this.facturas2) {
      for (const ele of arr) {
        try {
          const cantidad = await this.obtenerCantidadFacturas(
            parseInt(ele.identificador_factura)
          );
          cantidadFinal2 += cantidad;
          console.log('Cantidad parcial2:', cantidadFinal);
        } catch (error) {
          console.error('Error obteniendo cantidad:', error);
        }
      }
    }

    this.cantidadSucursal2 = cantidadFinal2;
    // para la 3
    let cantidadFinal3 = 0;

    for (const arr of this.facturas3) {
      for (const elem of arr) {
        try {
          const cantidad = await this.obtenerCantidadFacturas(
            parseInt(elem.identificador_factura)
          );
          cantidadFinal3 += cantidad;
          console.log('Cantidad parcial3:', cantidadFinal);
        } catch (error) {
          console.error('Error obteniendo cantidad:', error);
        }
      }
    }

    this.cantidadSucursal3 = cantidadFinal3;

    //******************* */

    console.log('Cantidad final1:', this.cantidadSucursal1);
    console.log('Cantidad final2:', this.cantidadSucursal2);
    console.log('Cantidad final3:', this.cantidadSucursal3);
    this.generarListaSucursales();
  }

  obtenerCantidadFacturas(identificadorFactura: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.servicio.obtenerTotalesFactura(identificadorFactura).subscribe(
        (result) => {
          if (result && result.total_descontado !== null) {
            console.log(result.total_descontado);
            resolve(Number(result.total_descontado));
          } else {
            reject('Valor nulo o no válido');
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  generarListaSucursales() {
    this.objetoFinal = [];

    // Generar un objeto temporal para cada sucursal y agregarlo a objetoFinal
    // Asegúrate de crear un nuevo objeto en cada iteración para evitar que todos los objetos sean iguales.
    for (let index = 1; index < 4; index++) {
      let objetoTemporalReporte: reporteVentaSucursal = new reporteVentaSucursal();

      switch (index) {
        case 1:
          objetoTemporalReporte.nombreSucusral = 'Norte';
          objetoTemporalReporte.cantidadDinero = this.cantidadSucursal1;
          break;
        case 2:
          objetoTemporalReporte.nombreSucusral = 'Sur';
          objetoTemporalReporte.cantidadDinero = this.cantidadSucursal2;
          break;
        case 3:
          objetoTemporalReporte.nombreSucusral = 'Centro';
          objetoTemporalReporte.cantidadDinero = this.cantidadSucursal3;
          break;
      }

      this.objetoFinal.push(objetoTemporalReporte);
    }

    console.log('Objeto final:', this.objetoFinal);
    this.objetoFinal.sort((a, b) => b.cantidadDinero - a.cantidadDinero);

  }


  ngOnInit(): void {
    this.obtenerEmpleados();
  }
}
