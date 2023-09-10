import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuarios } from 'src/modelos/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginIngresoService {


  readonly URL = "http://localhost:8080/api/user/";


  constructor(private http:HttpClient) { }


  /// genreacion de la peticion

  public getUsuario(usuario: usuarios):Observable<usuarios>{
    return this.http.get<usuarios>(this.URL+'user-sesion?nombre='+usuario.nombre+"&password="+usuario.password)

  }
  public setUsuario() {

  }
}
