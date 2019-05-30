import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

@Injectable({
  providedIn: 'root'
})
export class MainService {

bookId;
API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Devolvemos la información de un libro obtenido de nuestra base de datos para el libro más vendido.

  getBooks() {
    return this.http.get(`${this.API_URI}/books`);
  }

  // Devolvemos la información del libro con la mayor puntuación de nuestra base de datos.

  getBestBook() {
    return this.http.get(`${this.API_URI}/bestbook`);
  }


  getIconHome(codUsuario){
    return this.http.get(`${this.API_URI}/iconHome/${codUsuario}`);
  }

  searchUser(termino: string){
    return this.http.get(`${this.API_URI}/searchUser/${termino}`);
  }

  //Buscar club mas nuevo
 
  getNewClub() {
    return this.http.get(`${this.API_URI}/newClub`);
  }

  getMostRead(){
    return this.http.get(`${this.API_URI}/mostRead`);
  }

  // Último libro añadido a favoritos

  getlastBookAdd() {
    return this.http.get(`${this.API_URI}/lastBookAdd`);
  }

  lastFavo(codUsuario){
    return this.http.get(`${this.API_URI}/lastFavoriteISBN/${codUsuario}`);
  }

  // Agregar a favoritos

  mandoFavorito(codLibro, codUsuario) {

    // Creo el objeto con los datos que recibo del component

    const data = {
      codLibro,
      codUsuario
    };

    // Por el return mando el post indicando la ruta y el objeto que le paso,esto va dirigido al homeRouter.js

    return this.http.post(`${this.API_URI}/favoritos`, data);
  }

  // Eliminar de favoritos

  deleteFavorito(codLibro, codUsuario) {

    // Creo el objeto con los datos que recibo del component

    const data = {
      codLibro,
      codUsuario
    };

    // Por el return mando el post indicando la ruta y el objeto que le paso,esto va dirigido al homeRouter.js

    return this.http.post(`${this.API_URI}/deleteFavorito`, data);
  }

  // Consultamos si el libro esta ya en favoritos para bloquearlo o no.

  consultaFavorito(codLibro, codUsuario) {

    // Creo el objeto con los datos que recibo del component

    const data = {
      codLibro,
      codUsuario
    };
    // Por el return mando el post indicando la ruta y el objeto que le paso,esto va dirigido al homeRouter.js

    return this.http.post(`${this.API_URI}/consultaFavorito`, data);
  }
}
