import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from 'src/modelos/cliente';
import { productoInventario } from 'src/modelos/productoInventario';

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
}
