import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from 'src/modelos/cliente';
import { detallefacturas } from 'src/modelos/detalleFactura';
import { factura } from 'src/modelos/factura';
import { productoInventario } from 'src/modelos/productoInventario';
import { tarjetas } from 'src/modelos/tarjetas';
import { ventas } from 'src/modelos/ventas';

@Injectable({
  providedIn: 'root'
})
export class CajeroServiceService {
readonly URL = "http://localhost:8080/api/user/"
  constructor(private http: HttpClient) { }

  //funcion para ver clientes

    public buscarCliente(nit:string):Observable<cliente> {
      return this.http.get<cliente>(this.URL+"buscarClienteNit?nit="+nit);
    }

// funcion para obtener los elementos de inventario TODO SOLO SUCURSAL
public buscarProductoBodega(id_sucursal: string|undefined):Observable<any>{
  return this.http.get<any>(this.URL+"obtenerProductoCajero?id_sucursal="+id_sucursal)
}
  // fucnion para el ingreso de clientes

  public ingresoCliente(cliente:cliente):Observable<cliente> {
    return this.http.post<cliente>(this.URL+"ingresoCliente", cliente);
  }


  //funcion para obtener tarjetas

  public obtenerTarjetas(identificador: number):Observable<tarjetas> {
    return this.http.get<tarjetas>(this.URL+"obtenerTarjeta?identificador="+identificador);
  }

  // funcion para editar la cantidad de productos en inventario
  public elimnarCantidadInventario(identificador:number, cantidad:number):Observable<productoInventario> {
    // generar dos elementos ha enviar
    const requestBody = {identificador, cantidad};
    return this.http.post<productoInventario>(this.URL+"elimnarCantidadProducto", requestBody);
  }


  // funcion para terminar con ventas ingreso FInal

  public ingresoFactura(factura:factura):Observable<factura> {
    return this.http.post<factura>(this.URL+"generarFactura", factura);
  }

  // funcion parar ingreso de detalleFactura

  public ingresoDetalleFactura(detalleFactura: detallefacturas):Observable<detallefacturas> {
    return this.http.post<detallefacturas>(this.URL+"ingresoDetalleFactura", detalleFactura);
  }

  // funcion para el ingreso de las ventas
  public ingresoVenta(venta: ventas):Observable<ventas> {
    return this.http.post<ventas>(this.URL+'ingresoVenta', venta);
  }

}
