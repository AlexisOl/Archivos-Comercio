import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito-user',
  templateUrl: './carrito-user.component.html',
  styleUrls: ['./carrito-user.component.css']
})
export class CarritoUserComponent implements OnInit{

public roles: any;

  constructor(private httpclient: HttpClient){

  }
  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this.httpclient.get<any>('http://localhost:8080/roles').subscribe(
      response=> {
        console.log(response);
        this.roles = response;
      }
    );
  }
}
