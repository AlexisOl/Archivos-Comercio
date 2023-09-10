import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-general',
  templateUrl: './vista-general.component.html',
  styleUrls: ['./vista-general.component.css'],
})
export class VistaGeneralComponent {

  constructor(private router: Router) {

  }
  navigateToAbout() {
    this.router.navigate(['/compras']); // Navegar a la ruta '/about'
  }
}
