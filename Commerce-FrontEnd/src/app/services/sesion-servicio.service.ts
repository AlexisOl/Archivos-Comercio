import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { usuarios } from 'src/modelos/usuarios';

@Injectable({
  providedIn: 'root'
})
export class SesionServicioService {
  private usuario: usuarios | null = null;

  private user = new BehaviorSubject<usuarios | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(private router: Router,private http:HttpClient) {
    // Al inicializar el servicio, verifica si hay un usuario en LocalStorage y cárgalo si es así.
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      this.user.next(this.usuario);
    }
  }

  setUsuario(nuevoUsuario: usuarios) {
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    this.usuario = nuevoUsuario;
    this.user.next(nuevoUsuario);
  }

  eliminarUsuario() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.user.next(null);
  }

  getUsuario(): usuarios | null {
    return this.usuario;
  }

  isAuthenticated(): boolean {
    return !!this.getUsuario();
  }



}
