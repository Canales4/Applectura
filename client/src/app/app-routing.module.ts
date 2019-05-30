import { BookDetailsComponent } from './components/home/book-details/book-details.component';
import { BookListComponent } from './components/home/book-list/book-list.component';
import { BookSearchComponent } from './components/home/book-search/book-search.component';
import { MainComponent } from './components/home/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/home/perfil/perfil.component';
import { UsuarioComponent } from './components/loginPage/usuario/usuario.component';
import { RegisterComponent } from './components/loginPage/usuario/register/register.component';
import { LoginComponent } from './components/loginPage/usuario/login/login.component';
import { ClubComponent } from './components/home/clubs/club/club.component';
import { ClubInfoComponent } from './components/home/clubs/club-info/club-info.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home/profile',
    component: PerfilComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home/search',
    component: BookSearchComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home/list',
    component: BookListComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home/book/details',
    component: BookDetailsComponent, canActivate: [AuthGuardService]
  },
  // Login
  {
    path: 'signup', component: UsuarioComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'home/club',
    component: ClubComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home/club/info/:id',
    component: ClubInfoComponent, canActivate: [AuthGuardService]
  },

  {
    path: 'login', component: UsuarioComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: 'home', component: MainComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
