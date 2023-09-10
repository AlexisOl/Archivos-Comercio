import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionServicioService } from '../services/sesion-servicio.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private sesion: SesionServicioService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.sesion.isAuthenticated()) {
      console.log('si');

      return true; // Allow navigation if the user is authenticated
    } else {
      console.log('no');

      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}
