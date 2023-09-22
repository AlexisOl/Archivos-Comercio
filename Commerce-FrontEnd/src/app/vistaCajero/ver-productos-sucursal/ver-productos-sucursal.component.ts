import { Component, OnInit } from '@angular/core';
const ALTURAFILAS: {[id:number]: number} = {1:400, 3:335, 4:350};

@Component({
  selector: 'app-ver-productos-sucursal',
  templateUrl: './ver-productos-sucursal.component.html',
  styleUrls: ['./ver-productos-sucursal.component.css']
})

export class VerProductosSucursalComponent implements OnInit{

  cols = 3;
  rowHeight = ALTURAFILAS[this.cols];

  ngOnInit(): void {

  }

}
