import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-cli',
  templateUrl: './header-cli.component.html',
  styleUrls: ['./header-cli.component.css'],
})
export class HeaderCliComponent {

  constructor(private router: Router) {

  }
  navigateToAbout() {
    this.router.navigate(['/compras']); // Navegar a la ruta '/about'
  }
  regresoInicio() {
    this.router.navigate(['/inicio']);
  }

  irCarrito() {
    this.router.navigate(['/carrito']);
  }
  irLogin(){
    this.router.navigate(['/login']);

  }

}
