import { Component, OnInit } from '@angular/core';
//archivos importado
import { NavController } from '@ionic/angular';//Este arhicvo funciona para la navegacion entre pagina
import { NgForm } from '@angular/forms';//archivo formulario
import { AuthService } from 'src/app/services/auth.service';//servicio de autentificacion
import { AlertService } from 'src/app/services/alert.service';//servicio de alarma
import { ModalController } from '@ionic/angular';//controlador de una ventana modal


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //intanciamos los archivos
  constructor(private modalCtrl:ModalController, private authService: AuthService,private navCtrl: NavController,private alertService: AlertService) { }

  ngOnInit() {
  }

  //el metodo de logueo
  login(form: NgForm) {//la variable de tipo ngForm trae los datos inresados
    this.authService.login(form.value.email, form.value.password).subscribe(//el archivo autservice llama el metodo de logue e insertamos los valores de los campo de correo y contraseña, luego la funcion subscribe
      data => {//almacenara el dato que mande el api
        this.alertService.presentToast("Sesión Iniciada");//aparecera la alerta que se inicio sesión
      },
      error => {
        console.log(error);//si hay un error lo muestra en la consola
      },
      () => {
        this.navCtrl.navigateRoot('/dashboard');//si se cumple la condición nos manda a la pagina principal
        this.dismiss();//llamamos este metodo para cerrar la ventana modal del login
      }
    );
  }

  async dismiss(){//este metodo cierra la ventana modal
    await this.modalCtrl.dismiss();
  }

}
