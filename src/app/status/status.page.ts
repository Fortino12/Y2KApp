import { Component, OnInit } from '@angular/core';
//importamos
import { AuthService } from 'src/app/services/auth.service';//servicio de autentificacion
import { User } from 'src/app/models/user';//es el archivo del modelo

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  user: User;//variable de tipo modelo

  constructor(private authService: AuthService) { }//instanciamos el authService

  ngOnInit() {
  }

  ionViewWillEnter() {//este evento Se activa cuando el componente enrutado está a punto de animarse a la vista, cuando entras a la pagina
    this.authService.user().subscribe(//en esta función trae el metodo donde se almacena los datos del usuario conectado
      user => {//variable donde se guarda los datos del usuario
        this.user = user;//la variable tipo user almacena los datos
      }
    );
  }

}
