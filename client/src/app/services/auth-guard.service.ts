import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate } from '@angular/router';


@Injectable()

export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthenticationService, private router: Router) { }

  // para bloquear/permitir el acceso a rutas especificas
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      // this.auth.logout
    }
    return true;
  }
}
