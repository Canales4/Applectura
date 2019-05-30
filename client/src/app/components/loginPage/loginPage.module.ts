import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UsuarioComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
  ]
})
export class LoginPageModule { }
