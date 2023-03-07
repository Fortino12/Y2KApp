import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  //esta variable almacena el service donde se consumira las api, se crea este servicio para no repetir mucho el codigo, solo se hace una instancia
  API_URL = 'http://y2kapp.y2ksystems.com.mx/api/';
  
  constructor() { }
}
