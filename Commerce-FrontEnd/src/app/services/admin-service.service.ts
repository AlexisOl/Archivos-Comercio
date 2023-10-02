import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { cliente } from 'src/modelos/cliente';
import { detallefacturas } from 'src/modelos/detalleFactura';
import { factura } from 'src/modelos/factura';
import { producto } from 'src/modelos/producto';
import { productoInventario } from 'src/modelos/productoInventario';
import { usuarios } from 'src/modelos/usuarios';
import { ventas } from 'src/modelos/ventas';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  readonly URL = "http://localhost:8080/api/user/"

  constructor(private http:HttpClient) { }


  // funcion para obtener facturas
  public obtenerFacturas():Observable<factura> {
    return this.http.get<factura>(this.URL+"historialFactura");
  }
  // funcion para obtener clientes
  public obtenerClientes():Observable<cliente> {
    return this.http.get<cliente>(this.URL+"historialCliente");
  }

 // funcion para obtener facturas
 public obtenerFacturasMaxima():Observable<factura> {
  return this.http.get<factura>(this.URL+"historialFacturaMaxima");
}


  //funcion para obtener ventas en base a identificador
  public obtenerVentas(idFactura:number):Observable<ventas> {
    return this.http.get<ventas>(this.URL+"historialVenta?identificador_factura="+ idFactura);

  }


  //fucnion para tener todos los usarios que trabajen en una sucursal;
  public obtenerUsuario(idSucursal:string):Observable<usuarios> {
    return this.http.get<usuarios>(this.URL+"obtenerUsuariosSucursal?id_sucursal="+idSucursal);
  }

  //fucnion para tener
  // funcion para obtener facturas
  public obtenerFacturasPorUsuarioVenta(idEmpleado:string):Observable<ventas> {
    return this.http.get<ventas>(this.URL+"obtenerFacturasEmpleados?identificador_empleado="+idEmpleado);
  }

  //funcion para obtener totales

 public obtenerTotalesFactura(idFactura:number):Observable<factura> {
    return this.http.get<factura>(this.URL+"obtenerTotalesFacturas?identificador="+idFactura);
  }


  // utlimo reporte


  //obtener elementos sumandos
  public obtenerCantidadGlobalDetalleFactura():Observable<detallefacturas> {
    return this.http.get<detallefacturas>(this.URL+"obtenerCantidadGlobalDetalleFactura");
  }

  //obtener codigo bodega -------------------------
  //obtener codigo bodega -------------------------
  //obtener codigo bodega -------------------------
  //obtener codigo bodega -------------------------
  public obtenerCodgioBodega(identificador:number):Observable<productoInventario> {
    return this.http.get<productoInventario>(this.URL+"obtenerCodgioBodegaReporte?identificador="+identificador);
  }

  //obtener nombre producto (basico)
  public obtenerCodigoProducto(identificador:number):Observable<asigancionProductos> {
    return this.http.get<asigancionProductos>(this.URL+"obtenerCodigoProductoReporte?identificador"+identificador);
  }

    //obtener nombre producto (basico)
    public obtenerProducto(identificador:number):Observable<producto> {
      return this.http.get<producto>(this.URL+"obtenerProductoReporte?identificador"+identificador);
    }


    //ingreso de empelados;
    public ingresoEmpleados(empelado:usuarios):Observable<usuarios> {
      return this.http.post<usuarios>(this.URL+"ingresoUsuarios",empelado);
    }
}
