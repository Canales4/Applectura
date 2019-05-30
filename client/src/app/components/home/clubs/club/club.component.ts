import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClubsService, Club } from '../../../../services/clubs.service';
import { NavbarService } from '../../../../services/navbar.service';
import { PerfilService } from 'src/app/services/perfil.service';
import {
  AuthenticationService,
  UserDetails
} from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  termino = '';
  details: UserDetails;
  modalRef: BsModalRef;
  // array para almacenar los clubs que nos trae la consulta
  clubs: any = [];
  clubsSoci: any = [];
  clubsLU;
  priv = 'Elegir privacidad';
  genero = 'Elegir genero';
  // Creamos un objeto Club con todos sus elementos
  club: Club = {
    presidente: 0,
    nomClub: '',
    desClub: '',
    privaClub: '',
    generoClub: '',
    icono: ''
    // FecCreClub: new Date(),
  };

  constructor(
    private modalService: BsModalService,
    private clubsService: ClubsService,
    private nav: NavbarService,
    public auth: AuthenticationService,
    private perfilService: PerfilService
  ) {}

  ngOnInit() {
    // Activar el mostrar los clubs que existen
    this.buscarClubs();
    // Muestra barra de navegacion
    this.nav.show();

    this.listClubSocios();

    // PARA COGER LOS ELEMENTOS DEL USUARIO
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.getClubList();
      },
      err => {
        console.error(err);
      }
    );
  }
  // Coger la lista de clubs del usuario
  getClubList() {
    this.clubsService.getClubList(this.details.codUsuario).subscribe(
      res => {
        this.clubsLU = res;
        console.log(this.clubsLU);
      },
      err => console.log(err)
    );
  }
  // Para Buscar clubs
  buscarClubs() {
    // Comprobamos si el elemento esta vacio
    if (this.termino.length === 0) {
      this.clubs = [];
      return;
    }
    this.clubsService.getClubs(this.termino).subscribe(
      res => {
        console.log(res);
        this.clubs = res;
      },
      err => console.error(err)
    );
  }

  // listar clubs  por socios
  listClubSocios() {
    this.clubsService.listClubSocios().subscribe(
      res => {
        this.clubsSoci = res;
        console.log(this.clubsSoci);
      },
      err => console.log(err)
    );
  }

  // Para crear un club
  saveNewClub(
    presidente: number,
    nomClub: string,
    desClub: string,
    privaClub: string,
    generoClub: string
  ) {
    presidente = this.details.codUsuario;
    nomClub = this.club.nomClub;
    desClub = this.club.desClub;
    privaClub = this.club.privaClub;
    generoClub = this.club.generoClub;
    this.clubsService
      .saveClub(presidente, nomClub, desClub, privaClub, generoClub, this.club.icono)
      .subscribe(
        res => {
          console.log(res);
          this.buscarClubs(); // recarga el club
          this.getClubList();
        },
        err => console.error(err)
      );
  }

  // PARA EL FUNCIONAMIENTO DE LOS MODALES, ABRIR Y CERRAR
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

  // ELEGIR PRIVACIDAD
  select(type: string): void {
    if (type === 'público') {
      this.club.privaClub = 'público';
      this.priv = 'Todos pueden entrar';
    }
    if (type === 'privado') {
      this.club.privaClub = 'privado';
      this.priv = 'Solo para admitidos';
    }
  }

  // ELEGIR GENERO
  select2(type: string): void {
    if (type === 'Acción y Aventuras') {
      this.club.generoClub = 'Acción y Aventuras';
      this.genero = 'Acción y Aventuras';
    }
    if (type === 'Adulto') {
      this.club.generoClub = 'Adulto';
      this.genero = 'Adulto';
    }
    if (type === 'Bibliografías y Memorias') {
      this.club.generoClub = 'Bibliografías y Memorias';
      this.genero = 'Bibliografías y Memorias';
    }
    if (type === 'Ciencia Ficción') {
      this.club.generoClub = 'Ciencia Ficción';
      this.genero = 'Ciencia Ficción';
    }
    if (type === 'Cómics') {
      this.club.generoClub = 'Cómics';
      this.genero = 'Cómics';
    }
    if (type === 'Cómica') {
      this.club.generoClub = 'Cómica';
      this.genero = 'Cómica';
    }
    if (type === 'Dramática') {
      this.club.generoClub = 'Dramática';
      this.genero = 'Dramática';
    }
    if (type === 'Erótica') {
      this.club.generoClub = 'Erótica';
      this.genero = 'Erótica';
    }
    if (type === 'Fantasía') {
      this.club.generoClub = 'Fantasía';
      this.genero = 'Fantasía';
    }
    if (type === 'Histórica') {
      this.club.generoClub = 'Histórica';
      this.genero = 'Histórica';
    }
    if (type === 'Infantiles') {
      this.club.generoClub = 'Infantiles';
      this.genero = 'Infantiles';
    }
    if (type === 'Juveniles') {
      this.club.generoClub = 'Juveniles';
      this.genero = 'Juveniles';
    }
    if (type === 'Manga y Novela Gráfica') {
      this.club.generoClub = 'Manga y Novela Gráfica';
      this.genero = 'Manga y Novela Gráfica';
    }
    if (type === 'Poesía') {
      this.club.generoClub = 'Poesía';
      this.genero = 'Poesía';
    }
    if (type === 'Romántica') {
      this.club.generoClub = 'Romántica';
      this.genero = 'Romántica';
    }
    if (type === 'Teatro') {
      this.club.generoClub = 'Teatro';
      this.genero = 'Teatro';
    }
    if (type === 'Terror') {
      this.club.generoClub = 'Terror';
      this.genero = 'Terror';
    }
    if (type === 'Variado') {
      this.club.generoClub = 'Variado';
      this.genero = 'Variado';
    }
    if (type === 'Otros') {
      this.club.generoClub = 'Otros';
      this.genero = 'Otros';
    }
  }
}
