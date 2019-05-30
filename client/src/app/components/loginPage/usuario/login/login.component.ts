import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, tokenPayload } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../usuario.component.css']
})

export class LoginComponent {
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
    fechaNac: ''
  }
;
  constructor(private auth: AuthenticationService, private router: Router) { }
  // Para logear el usuario, se envian los datos introducidos si estan en la base de datos se le da un token y va al home
  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/home');
      },
      err => {
        console.error('La contraseña o el email no son correctos' + err);
        // Nos permite mostrar un mensaje por un tiempo predeterminado cuando se produce un error
        var element = document.getElementById('ErroInfo');
        element.classList.remove('d-none');
        setTimeout('document.getElementById("ErroInfo").classList.add("d-none")', 3500);
      }
    );
  }

  // Elemento para ver que lo que se introduce es un email
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
