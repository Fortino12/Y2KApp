import { Component, OnInit } from '@angular/core';
//importación
import { ModalController, MenuController, NavController } from '@ionic/angular';//controladores que vienen en angular
import { LoginPage } from '../auth/login/login.page';//la ruta de la pagina
import { AuthService } from 'src/app/services/auth.service';//servicio de autentificacion

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor( private modalController: ModalController,private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
  ) { //intancias de los archivos
    this.menu.enable(false);//este codigo bloquea el menu desplegable
  }
  ionViewWillEnter() {//En este metodo hacemos una promesa donde traemos el token del auth 
    this.authService.getToken().then(() => {//la instancia de authservice trae el metodo del token
      if(this.authService.isLoggedIn) {//se crea una condicion if donde dice que si la variable tiene token
        this.navCtrl.navigateRoot('/dashboard');//nos dirigira al menu principal
      }
    });
  }
  async login(){//metodo del una ventana modal
    const modal=await this.modalController.create({//se crea una ventana modal
      component: LoginPage,//aqui debe de ir el nombre de la pagina a mostrar
      animated: true,//la animacion del modal
      mode: 'ios',// que tipo quiere aparezca la venta si modo ios o android
      backdropDismiss: false,//para que no se cierre de repente
      cssClass: 'login-modal',//los estilos
    })
    return await modal.present();//retornara el metodo a mostrar
  }
  ngOnInit() {}
 
}
