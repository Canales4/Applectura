import { Component, OnInit } from '@angular/core';
import { ApiBooksService } from 'src/app/services/api-books.service';
import { ServerService } from 'src/app/services/server.service';
import {
  AuthenticationService,
  UserDetails
} from "src/app/services/authentication.service";
import { NavbarService } from "src/app/services/navbar.service";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  details: UserDetails; //identificar al usuario que hay logueado
  codUsuario: number;
  iconUser = "assets/fogg-coffee-break.png";
  codLibro: number;
  books;
  bestBookInfo: any = [];
  bestBook;
  currentRate = 0; // utilizamos el current para los corazones, lo inicializamos aquí.
  clubMasNuevo;
  agregado = false;
  arrFav: any[] = [];
  termino: string = "";
  searchUsers: any = [];
  arrLasFav: any = [];
  lastAddBook: any = [];
  arrMostRead;

  constructor(
    private bookservice: ApiBooksService,
    private serverservice: ServerService,
    private mainservice: MainService,
    public auth: AuthenticationService,
    public nav: NavbarService
  ) {}

  // información que va a aparecer nada mas se cargue la pagina

  ngOnInit() {
    this.nav.show();
    this.getUser();
    this.getlastBookAdd();
    this.getBestBookInfo();
    this.getmostRead();

  }

  //USUARIO CONECTADO
  
  //Método para extraer la información de la api a partir del nombre del libro.

  getUser() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.getIconHome();
        this.lastFavoriteISBN();
        this.getNewClub();

      },
      err => console.log(err)
    );
    return this.details;
  }

  //ICONO USUARIO CONECTADO, POR DEFECTO SALE UN ICONO

  getIconHome() {
    this.mainservice.getIconHome(this.details.codUsuario).subscribe(
      res => {
        this.details.icono == ""
          ? (this.iconUser = "assets/fogg-coffee-break.png")
          : (this.iconUser = this.details.icono);
      },
      err => console.log(err)
    );
  }

  // Devuelve el último libro añadido a la BBDD

  getlastBookAdd() {
    this.mainservice.getlastBookAdd().subscribe(
      res => {
        this.lastAddBook = res;
      },
      err => console.log(err)
    );
  }

  //Lo de Lino
  sendBook() {
    this.bookservice.receiveBookId(this.lastAddBook[0]);
  }

  // Método para obtener los puntos del libro con mayor puntuación de nuestra aplicación

  getBestBookInfo() {
    this.mainservice.getBestBook().subscribe(
      res => {
        this.bestBookInfo = res;
        if (this.bestBookInfo[0].puntuacion > 0) {
          this.currentRate = this.bestBookInfo[0].puntuacion;
        }
        this.codLibro = this.bestBookInfo[0].codLibro;
        this.consultaFavorito();
      },
      err => console.log(err)
    );
  }

  // FUNCION PARA GUARDAR LOS LIBROS EN FAVORITOS,coge los datos de arriba, me creo las variables y le asigno los valores.
  favoritos() {
    this.agregado = true;
    this.codUsuario = this.details.codUsuario;
    this.mainservice
      .mandoFavorito(this.codLibro, this.codUsuario)
      // Mando la información a mi mainService a mi función mandoFavorito
      .subscribe(res => {}, err => console.log(err));
    // Necesito el observable para que funcione y me mande la información.
  }

  deleteFavorito() {
    this.agregado = false;
    this.codUsuario = this.details.codUsuario;
    this.mainservice
      .deleteFavorito(this.codLibro, this.codUsuario)
      // Mando la información a mi mainService a mi función mandoFavorito
      .subscribe(res => {}, err => console.log(err));
    // Necesito el observable para que funcione y me mande la información.
  }

  // Consulta la base de datos para ver si el libro ya ha sido añadido a la lista

  consultaFavorito() {
    const usuario = this.getUser();
    this.mainservice
      .consultaFavorito(this.codLibro, usuario.codUsuario)
      .subscribe(
        res => {
// tslint:disable-next-line: only-arrow-functions
          const arr = Object.keys(res).map(function(k) {
            return res[k];
          });
          this.arrFav = arr;
          if (this.arrFav.length > 0) {
            this.agregado = true;
          }
        },
        err => console.log(err)
      );
  }

  // BUSQUEDA DE USUARIOS

  buscoUser() {
    if (this.termino.length === 0) {
      this.searchUsers = [];
      return;
    }
    this.mainservice.searchUser(this.termino).subscribe(
      res => {
        this.searchUsers = res;
      },
      err => console.log(err)
    );
  }

  // Busqueda de un nuevo club

  getNewClub() {
    this.mainservice.getNewClub().subscribe(
      res => {
        this.clubMasNuevo = res;
      },
      err => console.log(err)
    );
  }

  // Busqueda del ultimo favorito añadido en BBDD

  lastFavoriteISBN() {
    this.mainservice.lastFavo(this.details.codUsuario).subscribe(
      res => {
        this.arrLasFav = res;
      },
      err => console.log(err)
    );
    this.getmostRead();
  }

  //RANKING DE LIBROS MAS LEIDOS

  getmostRead() {
    this.mainservice.getMostRead().subscribe(
      res => {
        this.arrMostRead = res;

      },
      err => console.log(err)
    );
  }
}
