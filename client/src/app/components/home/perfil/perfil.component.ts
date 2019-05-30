import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';
import { PerfilService } from '../../../services/perfil.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Profile } from '../../../models/Profile';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  // DEFINIR
  // PARA EL PERFIL
  modalRef: BsModalRef;
  details: UserDetails;
  visi = 'Elegir una visibilidad';
  sex = 'Elegir sexo';

  icono = 'assets/fogg-coffee-break.png';

  // PARA LOS LIBROS FAVORITOS
  arrFav: any[] = [];
  arrLasFav;
  lastFavBook;
  agregado: boolean = false;
  codLibro: number;

  // PARA EL DATEPICKER
  model;
  date: { day: number, month: number,  year: number };

  // PERFIL

  profile: Profile = {
    codUsuario: 0,
    nomUsuario: '',
    apellido1: '',
    apellido2: '',
    email: '',
    visibilidad: '',
    bio: '',
    sexo: '',
    alias: '',
    icono: '',
    contrasena: '',
    fechaNac: ''
  };

  // PARA LAS VALIDACIONES

  myForm: FormGroup;

  constructor(private modalService: BsModalService, private router: Router, private activatedRoute: ActivatedRoute,
              public auth: AuthenticationService, private perfilService: PerfilService,
              public nav: NavbarService, private modal: NgbModal, public fb: FormBuilder, private calendar: NgbCalendar) {

                // SIN IMPLEMENTAR AÚN, ES PARA VALIDACIONES
                this.myForm = this.fb.group({
                  nomUsuario: ['', [Validators.required]],
                  apellido1: ['', [Validators.required]],
                  apellido2: ['', [Validators.required]],
                  email: ['', [Validators.required], [Validators.email]],
                  alias: ['', [Validators.required], [Validators.minLength(3)]],
                  bio: ['', [Validators.required], [Validators.minLength(4)], [Validators.maxLength(255)]],
                  contrasena: ['', [Validators.required]],
                  icono: ['', [Validators.required]],

                });

  }

  ngOnInit() {
    // VER LA NAVBAR SIEMPRE
    this.nav.show();

    // TRAER LOS DATOS DE USERDETAILS
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.details.icono == '' ? this.icono = 'assets/fogg-coffee-break.png' : this.icono = this.details.icono;
        this.lastFavorite();
        console.log(this.details.fechaNac);
      },
      err => {
        console.error(err);
      }
    );


  }

  // PARA EL FUNCIONAMIENTO DE LOS MODALES, ABRIR Y CERRAR

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

  // PARA EL FUNCIONAMIENTO DEL MODAL DE NUEVA CONTRASEÑA, ABRIR Y CERRAR
  closeModal2() {
    const modalRef = this.modalService.hide(2);
  }

  openStackedModal(template: TemplateRef<any>) {
    const modalRef = this.modal.open(template, {
      centered: true,
      size: 'sm'
    });
  }

  // VER, ELIMINAR Y MODIFICAR PERFIL

  getProfile(codUsuario: string) {
    this.perfilService.getProfile(codUsuario).subscribe(
      res => {
        this.profile = res;
      },
      err => console.log(err)
    );
  }

  deleteProfile(codUsuario: string) {
    this.perfilService.deleteProfile(codUsuario).subscribe(
      res => {
        console.log(res);
        console.log('perfil eliminado');
      },
      err => console.log(err)
    );
  }

  updateProfile(codUsuario: number, nomUsuario: string, apellido1: string, apellido2: string, visibilidad: string, email: string,
                bio: string, sexo: string, alias: string, contrasena: string, icono: string, fechaNac: string) {

    console.log(codUsuario);
    console.log(nomUsuario);

    // SI LOS DATOS SE MANDAN VACÍOS, SE QUEDAN LOS QUE YA ESTABAN

    if (nomUsuario === ''){
      nomUsuario = this.details.nomUsuario;
    }

    if (apellido1 === ''){
      apellido1 = this.details.apellido1;
    }

    if (apellido2 === ''){
      apellido2 = this.details.apellido2;
    }

    if (visibilidad === ''){
      visibilidad = this.details.visibilidad;
    }

    if (email === ''){
      email = this.details.email;
    }

    if (bio === ''){
      bio = this.details.bio;
    }

    if (sexo === ''){
      sexo = this.details.sexo;
    }

    if (alias === ''){
      alias = this.details.alias;
    }

    if (icono === ''){
      icono = this.details.icono;
    }

    if (contrasena === ''){
      contrasena = this.details.contrasena;
    }

    if (fechaNac === ''){
      fechaNac = this.details.fechaNac;
    }

    // MANDA LOS DATOS PARA MODIFICAR
    this.perfilService.updateProfile(codUsuario, nomUsuario, apellido1, apellido2, visibilidad, email,
                                     bio, sexo, alias, contrasena, icono, fechaNac).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/home/profile']);
      },
      err => console.error(err)
    )
 }

  // ELEGIR VISIBILIDAD

  // VISI: COMO SE VE, VISIBILIDAD: COMO ESTÁ EN LA BBDD
  select(type: string): void {
    if (type === 'Público') {
      this.profile.visibilidad = 'Público';
      this.visi = 'Visible para todos';
    }
    if (type === 'Solo Club') {
      this.profile.visibilidad = 'Solo Club';
      this.visi = 'Solo para mis clubs';
    }
    if (type === 'Privado') {
      this.profile.visibilidad = 'Privado';
      this.visi = 'Solo para mí';
    }
  }

  // ELEGIR SEXO

  select2(type: string): void {
    if (type === 'Mujer') {
      this.profile.sexo = 'Mujer';
      this.sex = 'Mujer';
    }
    if (type === 'Hombre') {
      this.profile.sexo = 'Hombre';
      this.sex = 'Hombre';
    }
    if (type === 'Otro') {
      this.profile.sexo = 'Otro';
      this.sex = 'Otro';
    }
  }

  // LIBROS FAVORITOS

   lastFavorite() {
    this.perfilService.lastFavo(this.details.codUsuario).subscribe(
      res => {
        this.arrLasFav = res;
        console.log(this.arrLasFav);
      },
      err => console.log(err)
    );
  }
  // COMPROBACION EMAIL, SIN IMPLEMENTAR AÚN

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // PARA LAS VALIDACIONES CON FORMGROUP, SIN IMPLEMNTAR AÚN
  saveData(){
    console.log(this.myForm.value);
  }

  datePicker(){
    this.profile.fechaNac = `${this.model.year}-${this.model.month}-${this.model.day}`;
    console.log(this.profile.fechaNac);
  }

}
