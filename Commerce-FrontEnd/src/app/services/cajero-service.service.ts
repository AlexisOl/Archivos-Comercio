import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from 'src/modelos/cliente';

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


  // fucnion para el ingreso de clientes
}
