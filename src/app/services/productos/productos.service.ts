import { Injectable } from '@angular/core';
//archivos importado
import { HttpClient } from '@angular/common/http';//los modulos para comunicarse con el back-end
import { EnvService } from '../env.service';//el service de la ruta
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient,private env: EnvService) { }//se intancia los archivos importado

  getProductos(){//en este metodo se retornan los productos de la api del webservice
    return this.http.get(this.env.API_URL + 'auth/appProducto');
  }
  
}
