import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Para crear un objeto club con las propiedades del club
export interface Club {
  codClub?: number; // se le pone ? para decir que el campo es opcional
  presidente: number;
  nomClub: string;
  desClub?: string;
  privaClub?: string;
  generoClub?: string;
  icono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  public clubes = {
    codClub: null,
    presidente: null,
    nomClub: null,
    desClub: null,
    privaClub: null,
    generoClub: null,
    icono: null
  };

  API_URI = 'http://localhost:3000/club';

  constructor(private http: HttpClient) { }

  // para obtener los clubs que hay por nombre
  getClubs(termino: string) {
    return this.http.get(`${this.API_URI}/clubs/${termino}`);
  }

  // para obtener los clubs que hay
  // getClubs() {
  //   return this.http.get(`${this.API_URI}/`);
  // }

  // para obtener un club especifico
  getClub(id: string) {
    return this.http.get(`${this.API_URI}/${id})`);
  }

  // para obtener los clubs del usuario
  getClubList(idUser: number) {
    return this.http.get(`${this.API_URI}/list/${idUser}`);
  }

  // para guardar el club, decimos que va a ser un objeto club de tipo club que hemos especificado en al interface de arriba
  saveClub(presidente: number, nomClub: string, desClub: string, privaClub: string, generoClub: string, icono: string) {
    this.clubes.presidente = presidente;
    this.clubes.nomClub = nomClub;
    this.clubes.desClub = desClub;
    this.clubes.privaClub = privaClub;
    this.clubes.generoClub = generoClub;
    this.clubes.icono = 'assets/fogg-welcome-3.png';
    console.log(this.clubes);
    return this.http.post(`${this.API_URI}/`, this.clubes);
  }

  // para borrar un club
  deleteClub(id: string) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  // para borrar un socio
  deleteSocio(idS: number) {
    return this.http.delete(`${this.API_URI}/expel/${idS}`);
  }

  // actualizar un club
  updateClub(codClub: number, nomClub: string, desClub: string, icono: string) {
    this.clubes.codClub = codClub;
    this.clubes.desClub = desClub;
    this.clubes.nomClub = nomClub;
    this.clubes.icono = icono;
    return this.http.put(`${this.API_URI}/${codClub}`, this.clubes);
  }

  joinClub(codUser: string | number, codClub: string | number) {
    const data = {
      idUser: codUser,
      idClub: codClub
    };
    return this.http.post(`${this.API_URI}/join`, data);
  }

  leaveClub(codUser: string | number, codClub: string | number) {
    return this.http.delete(`${this.API_URI}/leave/${codUser}/${codClub}`);
  }

  getMonthBooks(codClub: string | number, month: string) {
    return this.http.get(`${this.API_URI}/monthBooks/${codClub}/${month}`);
  }

  getSocios(codUser: string | number, codClub: string | number) {
    return this.http.get(`${this.API_URI}/socios/${codUser}/${codClub}`);
  }

  getLibroMes(mes: string, codClub: string | number) {
    return this.http.get(`${this.API_URI}/libroMes/${mes}/${codClub}}`);
  }

  libroMes(codUser: string | number, codClub: string | number, codLib: string | number, fec: string) {
    const data = {
      idUser: codUser,
      idClub: codClub,
      idLib: codLib,
      month: fec
    };
    return this.http.post(`${this.API_URI}/monthBook`, data);
  }

  // PARA traer los clubs con sus socios;
  listClubSocios() {
    return this.http.get(`${this.API_URI}/listS/socios`);
  }

  // PARA traer socios;
  listSociosClubs(idClub: number) {
    return this.http.get(`${this.API_URI}/listaC/${idClub}`);
  }


}



