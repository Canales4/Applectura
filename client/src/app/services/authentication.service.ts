import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface UserDetails {
  codUsuario: number;
  nomUsuario: string;
  apellido1: string;
  apellido2: string;
  contrasena: string;
  bio: string;
  email: string;
  icono: string;
  visibilidad: string;
  sexo: string;
  alias: string;
  exp: number;
  iat: number;
  fechaNac: string;
}

interface TokenResponse {
  token: string;
}

// el token tendra los elementos siguientes

// tslint:disable-next-line: class-name
export interface tokenPayload {
  codUsuario: number;
  nomUsuario: string;
  apellido1: string;
  apellido2: string;
  contrasena: string;
  email: string;
  icono: string;
  bio: string;
  sexo: string;
  alias: string;
  fechaNac: string;
}

@Injectable()
export class AuthenticationService {

  API_URI = 'http://localhost:3000/loginPage';

  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  // guardamos el token con los elementos que le entran
  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.token = token;
  }
  // obtener el token
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }
  // obtener los detalles del usuario
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  // comprobamos si el usuario esta logeado
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  // registrar el usuario
  public register(user: tokenPayload): Observable<any> {
    const base = this.http.post(`${this.API_URI}/register`, user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }
  // logear el usuario
  public login(user: tokenPayload): Observable<any> {
    const base = this.http.post(`${this.API_URI}/login`, user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }
  // para obtener el perfil del usuario
  public profile(): Observable<any> {
    return this.http.get(`${this.API_URI}/profile`, {
      headers: { Authorization: `${this.getToken()}` }
    });
  }
  // para desloguear el usuario y eliminar el token
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }

}
