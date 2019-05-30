import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  API_URI = 'http://localhost:3000';

  // DEFINIR OBJETO PERFIL

  public profile = {
    codUsuario: null,
    nomUsuario: null,
    apellido1: null,
    apellido2: null,
    visibilidad: null,
    email: null,
    bio: null,
    sexo: null,
    alias: null,
    icono: null,
    contrasena: null,
    fechaNac: null
  }

  // RECOGE EL PERFIL Y SUS DATOS

  constructor( private http: HttpClient) { }
  getProfile(codUsuario: string) {
    return this.http.get(`${this.API_URI}/home/${codUsuario}`);
  }

  // ELIMINAR PERFIL

  deleteProfile(codUsuario: string) {
    return this.http.delete(`${this.API_URI}/delete/${codUsuario}`);
  }

  // MODIFICAR PERFIL

  public updateProfile(codUsuario: number, nomUsuario: string, apellido1: string, apellido2: string, visibilidad: string, email: string,
                       bio: string, sexo: string, alias: string, contrasena: string, icono: string, fechaNac: string): Observable<any> {

    // DEFINIR
    this.profile.codUsuario = codUsuario;
    this.profile.nomUsuario = nomUsuario;
    this.profile.apellido1 = apellido1;
    this.profile.apellido2 = apellido2;
    this.profile.contrasena = contrasena;
    this.profile.visibilidad = visibilidad;
    this.profile.email = email;
    this.profile.bio = bio;
    this.profile.sexo = sexo;
    this.profile.alias = alias;
    this.profile.icono = icono;
    this.profile.fechaNac = fechaNac;
    console.log(this.profile);
    return this.http.put<any>(this.API_URI + `/profile/modify/${codUsuario}`, this.profile);
  }

  // FAVORITOS

  lastFavo(codUsuario) {
    return this.http.get(`${this.API_URI}/profile/lastFavorite/${codUsuario}`);
  }

  mandoFavorito(codLibro, codUsuario) {

    // Creo el objeto con los datos que recibo del component

    const data = {
      codLibro,
      codUsuario
    };

    // Por el return mando el post indicando la ruta y el objeto que le paso,esto va dirigido al homeRouter.js

    return this.http.post(`${this.API_URI}/favoritos`, data);
  }

  consultaFavorito(codLibro, codUsuario) {

    // DEFINIR OBJETO, RECIBE DATOS DEL COMPONENT
    const data = {
      codLibro,
      codUsuario
    };
    // Por el return mando el post indicando la ruta y el objeto que le paso,esto va dirigido al profileRouter.js
    return this.http.post(`${this.API_URI}/consultaFavorito`, data);
  }
}
