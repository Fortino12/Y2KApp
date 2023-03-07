import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';//controlador de la alerta que sale cuando se loguea o desloguea

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController) { }//se instancia
  
  async presentToast(message: any) {//este metodo sera de tipo ansy que devolvera una promesa pero se crea una variable para cualquier tipo
    const toast = await this.toastController.create({
      //se crea la constante  para que el controlador cree el mensaje
      message: message,//una variable de tipo mensaje, que puede venir el mensaaje que retorna los api de loguearse y cuando se desloguea
      duration: 2000,//la duracion que aparecera
      position: 'bottom',//su ubicación
      color: 'primary'//el color
    });
    toast.present();//la constante con el metodo para presentarse 
  }

}