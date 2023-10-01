import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { factura } from 'src/modelos/factura';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  readonly URL = "http://localhost:8080/api/user/"

  constructor(private http:HttpClient) { }


  public obtenerFacturas():Observable<factura> {
    return this.http.get<factura>(this.URL+"historialFactura");
  }


}
