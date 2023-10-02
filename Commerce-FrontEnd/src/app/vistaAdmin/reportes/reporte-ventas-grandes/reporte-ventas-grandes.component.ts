import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { repoteMaxVenta } from 'src/modelos/reporteMaxVenta';
import { ventas } from 'src/modelos/ventas';

@Component({
  selector: 'app-reporte-ventas-grandes',
  templateUrl: './reporte-ventas-grandes.component.html',
  styleUrls: ['./reporte-ventas-grandes.component.css'],
})
export class ReporteVentasGrandesComponent implements OnInit {
  valores: any;
  valoresFinales: repoteMaxVenta[]=[];
  valorFinalMaxVenta:repoteMaxVenta[]=[];
  constructor(private servicioVentas: AdminServiceService) {}


  // funcion facturas
  obtenerFacturas() {
    let ventaReporte: repoteMaxVenta = new repoteMaxVenta();
    this.servicioVentas.obtenerFacturasMaxima().subscribe((facturas) => {
      this.valores = facturas;
      this.valores.forEach((elementos: any) => {
        if(elementos.total_descontado !== null) {
          console.log(elementos);
         this.obtenerVentaFinal((elementos));
        }
      });
    });
  }

  obtenerVentaFinal(elementosYaFacturados: any ) {
    let ventaReporte: repoteMaxVenta = new repoteMaxVenta();

      this.servicioVentas.obtenerVentas(elementosYaFacturados.identificador).subscribe(
        (venta:ventas) => {
          if(venta !== null) {
            console.log("///////////////////---------//////////////////////");
            ventaReporte.identificador = venta.identificador;
            ventaReporte.identificador_empleado = venta.identificador_empleado;
            ventaReporte.identificador_factura = elementosYaFacturados.identificador;
            ventaReporte.nit_cliente = elementosYaFacturados.nit_cliente;
            ventaReporte.total_descontado = elementosYaFacturados.total_descontado;
            ventaReporte.fecha_facturacion = elementosYaFacturados.fecha_facturacion;
            console.log(ventaReporte);
            this.valorFinalMaxVenta.push(ventaReporte);

          }


        }
      );
  }

  // funcion para obtener ventas;
  obtenerVentas2() {
    this.valoresFinales = [];

    let ventaReporte: repoteMaxVenta = new repoteMaxVenta();
    this.servicioVentas.obtenerFacturasMaxima().subscribe((facturas) => {
      this.valores = facturas;
      console.log(facturas.identificador);
      this.valores.forEach((elementos: any) => {
        console.log(elementos.total_descontado);
        console.log(elementos.identificador);
        // generacion venta
        if (elementos.total_descontado !== null) {
          this.servicioVentas
            .obtenerVentas(elementos.identificador)
            .subscribe((venta) => {

              ventaReporte.identificador = venta.identificador;
              ventaReporte.identificador_empleado = venta.identificador_empleado;
              ventaReporte.identificador_factura = elementos.identificador;
              ventaReporte.nit_cliente = elementos.nit_cliente;
              ventaReporte.total_descontado = elementos.total_descontado;
              ventaReporte.fecha_facturacion = elementos.fecha_facturacion;
                console.log(ventaReporte);
              this.valorFinalMaxVenta.push(ventaReporte);


            });
        }
      });
    });
  }
  ngOnInit(): void {
    this.obtenerFacturas();
    console.log(this.valoresFinales);

  }
}
