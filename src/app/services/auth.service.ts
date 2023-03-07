import { Injectable } from '@angular/core';
//archivos importados
import { HttpClient, HttpHeaders } from '@angular/common/http';//para acceder el servio del back-end
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';//navegar por pagina
import { EnvService } from './env.service';//el servicio donde se encuentra la ruta
import { User } from '../models/user';//el modello user
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //agregamos
  isLoggedIn = false;//variable de tipo boolean
  token:any;//variable que almacenara cualquier tipo

  constructor( private http: HttpClient,private storage: NativeStorage,private env: EnvService,) { }//instancias de los archivos importados

  //creamos los métodos siguientes
  login(email: String, password: String) {//metodo donde pasaremos dos variables 
    return this.http.post(this.env.API_URL + 'auth/applogin',//retornara los datos de la api, por eso el http, con metodo post
      {email: email, password: password}//mas las dirección de la api, y con las variables que utilizara
    ).pipe(//el pipe transformara cadena
      tap(token => { //Realice un efecto secundario para cada emisión en la fuente Observable, pero devuelva un Observable que sea idéntico a la fuente
        this.storage.setItem('token', token)//el storage  nos permite almacenar datos de manera local en el navegador y sin necesidad de realizar alguna conexión a una base de datos.
        .then(// almacenara el token
          () => {
            console.log('Token Stored');//mostrara el token en consola
          },
          error => console.error('Error storing item', error)//por si hay un error
        );
        this.token = token;//la variable toquen almacenara el token creado por la api
        this.isLoggedIn = true;//la avariable booleana cambiara a tru3 para poder acceder
        return token;//retornara el token
      }),
    );
  }

  logout() {//para desloguearse
    const headers = new HttpHeaders({//se crea una constatate para que permita al cliente y al servidor enviar información adicional junto a una petición o respuesta. 
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]//aqui esta autorizadon al toquen
    });
    return this.http.get(this.env.API_URL + 'auth/applogout', { headers: headers })//consumira la api encontrada en esta ruta pero con metodo get
    .pipe(
      tap(data => {//en data alamacena los datos recogido en la api
        this.storage.remove("token");//se removera el token
        this.isLoggedIn = false;//cambia la variable para poder salir
        delete this.token;//elimina el token
        return data;//retornan los datos cambeaos
      })
    )
  }

  user() {//en este metodo se almacenara los datos del usuario logueado
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/appuser', { headers: headers })
    //retornara los datos del usuario logueado
    .pipe(
      tap(user => {
        return user;//se guarda en la variable
      })
    )
  }

  getToken() {//metodo para almacenar el token
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
       // console.log(data);
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}
