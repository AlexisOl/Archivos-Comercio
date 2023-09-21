import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajeroServiceService {
readonly URL = "http://localhost:8080/api/user/"
  constructor(private http: HttpClient) { }

  //funcion para ver
}
