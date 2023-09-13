import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { producto } from 'src/modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class BodegaServicioService {

  readonly URL = "http://localhost:8080/api/user/";


  constructor(private http: HttpClient) { }


  //ingreso producto:
  public guardarProducto(producto: producto):Observable<producto>{
    // genera el post en la direccion y envia el objeto
    return this.http.post<producto>(this.URL+'guardarProducto', producto);

  }


  // busqueda en base a un identificador
  public buscarProducto(id: number): Observable<producto> {

    return this.http.get<producto>(this.URL+'buscarProducto?identificador='+id)

  }


  // ingreso de elementos a tienda:
  public ingresoElementosTienda(asigancionProducto: asigancionProductos):Observable<asigancionProductos> {
    return this.http.post<asigancionProductos>(this.URL+'guardarAsignacionProducto', asigancionProducto);
  }

}
