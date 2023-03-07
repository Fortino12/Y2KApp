import { Component } from '@angular/core';

//importamos los servicos que creamos, controladores que viene por defecto en angular, el plugin de localnotification
import { AuthService } from './services/auth.service';//servicios que creamos
import { AlertService } from './services/alert.service';//servicios que creamos
//controladores de ventana modal, el menu,nav y platform
import { ModalController,Platform, MenuController, NavController } from '@ionic/angular';
//El puglin de notification
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Pago', url: '/pago', icon: 'mail' },
    { title: '¿Quienes Somos? ', url: '/about', icon: 'book' },
    { title: 'Politicas', url: '/politica', icon: 'list' },
    { title: 'Estatus', url: '/status', icon: 'card'},
  ];//es un array donde se almacenara el titulo de la pagina, su ruta y un icono
  
  constructor(
    private platform: Platform,//viene por defecto
    //inyectamos todo las dependencias de los archivos que importamos
    private authService: AuthService,//archivo de auth donde creamos los metodos para iniciar session, y cerrar
    private navCtrl: NavController,//agregamos
    private alertService: AlertService, //archivo de un alert
    private localNotifications: LocalNotifications//el plugin de notification
  ) {
    this.initializeApp();//metodo para cuando se inicialice la app viene por defecto
  }

  initializeApp() {//En este metodo hacemos una promesa donde traemos el token del auth y el de notificación
    this.platform.ready().then(() => {
      //comentamos el splashscreen
     // this.splashScreen.hide();

     //agregamos
      this.authService.getToken();//con la instancia llamamos el metodo getToken()del arhivo authService
      this.simpleNotif();//el metodo de la notifiacion
    });
  }
  //metodo para desloguearse
  logout() {//nombre del metodo
    this.authService.logout().subscribe(//se llama la instancia para utilizar el metodo de ese archivo mas una funcion de coleccion de valores
      data => { //variable donde se almacena el return del metodo logout
        this.alertService.presentToast(data['message']);//se llama el archivo de alertservice donde se encuentra una aletar en paretesi se inserta el mensaje que llevara cuando se desloguea
      },
      error => {//variable de error
        console.log(error);//el erro aparecera en la consola
      },
      () => {
        this.navCtrl.navigateRoot('/welcome');//el modulo del nav es para navegar por paginas y se arroja al inicio
      }
    );
  }

  simpleNotif() {//nombre del metodo
    this.localNotifications.schedule({//instancia de la notificacion, con un metodo que trae ese plugin
      id: 4,//la id de la notificacion
      title:'Recordatorio',//titulo
      text: 'Te recordamos que tu fecha de pago es cada 4 de cada mes',//el texto que lleva
      trigger:{in: 1,every:ELocalNotificationTriggerUnit.MINUTE},//el trigger es la función de cuando saldra la notificacion
      foreground:true//propiedad para que se visualice como un mensaje 
    });
  }

}
