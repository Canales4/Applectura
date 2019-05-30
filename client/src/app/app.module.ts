import { ModalsComponent } from './components/modals/modals.component';
import { ServerService } from './services/server.service';
import { ApiBooksService } from './services/api-books.service';
import { HomeModule } from './components/home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/home/main/main.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalDialogModule } from 'ngx-modal-dialog';
import { ModalModule } from 'ngx-bootstrap';
import { LoginPageModule } from './components/loginPage/loginPage.module';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './shared/header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterComponent } from './shared/footer/footer.component';
import { ClubsService } from './services/clubs.service';

// FORMATEAR FECHA EN ESPAÑOL
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePy from '@angular/common/locales/es-PY';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ModalsComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomeModule,
    LoginPageModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    ModalDialogModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    ApiBooksService, ServerService, NgbActiveModal, AuthenticationService, AuthGuardService,ClubsService,
    { provide: LOCALE_ID, useValue: 'es' }
  ]
})
export class AppModule { }
