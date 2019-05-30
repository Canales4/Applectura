import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, tokenPayload } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../usuario.component.css']
})

export class RegisterComponent {
  credentials: tokenPayload = {
    codUsuario: 0,
    nomUsuario: '',
    apellido1: '',
    apellido2: '',
    icono: '',
    email: '',
    contrasena: '',
    bio: '',
    sexo: '',
    alias: '',
    fechaNac: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) { }
 // Para registrar a el usuario, se envian los datos introducidos si son correctos se le da un token y va al home
  register() {
    this.auth.register(this.credentials).subscribe(  // Llamamos al register que esta definido en authenticatiuon.service
      () => {
        this.router.navigateByUrl('/home');
      },
      err => {
        console.error(err);
      }
    );
  }
 // Elemento para ver que lo que se introduce es un email
// tslint:disable-next-line: max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
