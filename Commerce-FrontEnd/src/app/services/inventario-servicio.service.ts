import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { producto } from 'src/modelos/producto';
import { productoInventario } from 'src/modelos/productoInventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioServicioService {
  readonly URL = "http://localhost:8080/api/user/";


  constructor(private http: HttpClient) { }

    // vista de los ingresos de bodega (solo la bodega del inventarista)

    public verElementosBodega(id:string): Observable<asigancionProductos> {
      return this.http.get<asigancionProductos>(this.URL+'verBodega?id_sucursal='+id);

    }

    // ingreso de elmemento a inventario (tienda)
    public ingresoElementos(producto: productoInventario, idSucursal: string|undefined):Observable<productoInventario>{
      const requestBody = { producto, idSucursal };
      return this.http.post<productoInventario>(this.URL+"ingresoInvetario",  requestBody);
    }

    // busca el elemento en base al id (solo en su bodega)
    public buscarProducto(id: number): Observable<asigancionProductos> {

      return this.http.get<asigancionProductos>(this.URL+'buscarProductoBodega?identificador='+id)

    }

    // obtener los productos de inventario la cantidad()
    public getCantidadProductoInventario(id: number): Observable<productoInventario> {
      return this.http.get<productoInventario>(this.URL+'cantidadenInventario?identificador='+id);
    }

}
