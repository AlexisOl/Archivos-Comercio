import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { asigancionProductos } from 'src/modelos/asignacionProductos';
import { producto } from 'src/modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioServicioService {
  readonly URL = "http://localhost:8080/api/user/";


  constructor(private http: HttpClient) { }

    // vista de los ingresos de bodega

    public verElementosBodega(): Observable<asigancionProductos> {
      return this.http.get<asigancionProductos>(this.URL+'verBodega');

    }

}
