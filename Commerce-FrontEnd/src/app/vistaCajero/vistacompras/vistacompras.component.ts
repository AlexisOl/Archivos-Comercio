import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vistacompras',
  templateUrl: './vistacompras.component.html',
  styleUrls: ['./vistacompras.component.css']
})
export class VistacomprasComponent implements OnInit{
   objetosLista: any
  ngOnInit(): void {
    this.toppings.valueChanges.subscribe(selectedToppings => {
      this.objetosLista= selectedToppings;
    });

  }
  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
