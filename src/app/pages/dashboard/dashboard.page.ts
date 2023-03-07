import { Component, OnInit } from '@angular/core';
 //archivos importados
import { MenuController } from '@ionic/angular';//controlador de menu desplegable
import { AuthService } from 'src/app/services/auth.service';//servicio de autentificación
import { User } from 'src/app/models/user';//arhivo del modelo user
import { ProductosService } from '../../services/productos/productos.service';//servicio de los productos
import { ActivatedRoute } from '@angular/router';
import {  ViewChild } from '@angular/core';//este archivo es un decorador de propiedades que configura una consulta de vista es para el slide
import { IonSlides } from '@ionic/angular';//controlador de los slide

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;//varibale de tipo user

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController, private authService: AuthService,private productoService:ProductosService) { //instancias
    this.menu.enable(true);//para que me muestre el menu desplegable

    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
    };

  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  producto: any;//variable de cualquier tipo

  ngOnInit() {
    this.productoService.getProductos().subscribe(data=>{//en esta funcion se guarda los productos consumido de la api
      this.producto=data;//varibale donde se guardara los productos
    })  
  }

  ionViewWillEnter() {//al momento de incializar al app funcione la funcion siguiente
    this.authService.user().subscribe(//el archivo authservice trae el metodo user donde traera de la api los datos del usuario logueado
      user => {
        this.user = user;//se almacena los datos del usuario
      }
    );
  }

  

}
