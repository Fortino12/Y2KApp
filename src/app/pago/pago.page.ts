import { Component, OnInit } from '@angular/core';
//imortacion de los plugin que se utilizaran
import { EmailComposer } from '@ionic-native/email-composer/ngx';//plugin para enviar emails
import { Platform } from '@ionic/angular';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';//modulo para los formulario
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';//plugin de la camara
import { WebView } from '@ionic-native/ionic-webview/ngx';//este plugin es para convertir la foto de base 64 a fiscio
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';//plugin de las notificaciones

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  constructor(public Platform: Platform,private localNotifications: LocalNotifications,private webView:WebView,private _form:FormBuilder,private emailComposer: EmailComposer,private camera: Camera) { 
    //se instancia los plugin
    this.form = this._form.group({//la variable de tipo form agrupara los datos de formulario del envio
      "subject":["", Validators.required],//el asunto se dice que se requiere
      "message":["", Validators.required]//igual que el mensaje
   });
  }

  public form  : FormGroup;//se declara una variable publica de tipo formgroup,agrupa los datos del formulario

  ngOnInit() {
  }

  archivo:string;//variable de tipo string donde se almacenara la foto tomada
  image:string;//variable de tipo string donde se almacenara la foto tomada
  
  takePhoto(){//metodo para tomar la foto
    const options: CameraOptions = {// en esta constante se declara las opciones que requiere la foto
      quality: 100,//la calidad de la foto
      destinationType: this.camera.DestinationType.FILE_URI,//el destinatario de como quiere la foto, si en base64 o en la ruta donde se almacena
      encodingType: this.camera.EncodingType.JPEG,//el formato de la foto
      mediaType: this.camera.MediaType.PICTURE//el mediaType es como quiere que sea la foto si tomada o traida de la galeria
    }
    this.camera.getPicture(options).then((imageData) => {//la instancia traera un metodo para traer la foto y se le agrea la constante de las opciones
      //la variable imageData se almacenara la ruta de la foto
      this.image=this.webView.convertFileSrc(imageData);//la variable image convertira la ruta a una foto fisica para que se visualice
      this.archivo=imageData;//la variable archivo almacena la dirección de la foto para ingresarla al correo
     }, (err) => {
     });
  }

  simpleNotif() {//Este metodo es de la notificación
    this.localNotifications.schedule({//la instancia del plugin con un metodo que trae el plugin
      id: 1,//propiedad id
      text: 'Comprobante recibido',//la propiedad de los texto
      data: { secret: 'secret' },//propiedad data es secreta
      trigger: { at: new Date(new Date().getTime() + 25000) },//cuando el comprobante es recibido
      foreground:true//para que se visualice
    });
  }
  

  recordatorio(){//los mismo paso de los otras notificaciones solo cambia la id
    this.localNotifications.schedule({
      id: 2,
      title:'Recordatorio',
      text: 'Hoy te corresponde enviar tu comprobante de pago',
      trigger:{in: 1,every:ELocalNotificationTriggerUnit.MONTH},//recordatorio de cada mes
      foreground:true
    });
  }

  recordatorio1(){
    this.localNotifications.schedule({
      id: 3,
      title:'Recordatorio',
      text: 'Hoy te corresponde enviar tu comprobante de pago',
      trigger:{in: 1,every:ELocalNotificationTriggerUnit.MINUTE},//recordatorio de un minuto simulando un mes
      foreground:true
    });
  }

  enviar(){//el metodo enviar
    let email = {//se crea una variable para que solo se utilice en este bloque
      to: 'Y2ksystemtienda@gmail.com',//correo a quien va dirigido
      attachments: [
        this.archivo//la variable donde se almaceno la foto
      ],
      subject: this.form.controls["subject"].value,// el grupo de form para que muestre lo que se escribio en el formulario
      body: this.form.controls["message"].value,
      isHtml: true
    }
    this.emailComposer.open(email);//abre la aplicación para enviar la imagen
    this.simpleNotif();//las notificaciones
    this.recordatorio();
    this.recordatorio1();
  }

}
