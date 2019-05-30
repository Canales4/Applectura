import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClubsService, Club } from 'src/app/services/clubs.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {
  AuthenticationService,
  UserDetails
} from 'src/app/services/authentication.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../../../services/server.service';
import { Data } from 'src/app/models/Data';
import { DatePipe } from '@angular/common';
import { ApiBooksService } from '../../../../services/api-books.service';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {
  details: UserDetails;
  modalRef: BsModalRef;
  clubs: any = [];
  perteneceClub = false;
  presidente = false;
  books;
  booksMonths;
  socios: any = [];
  monthBook;
  userCod: Data = {
    codUser: ''
  };
  tituloLibroMes = '';
  portadaLibroMes = '';
  now = new Date();
  constructor(
    private activedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private modal: NgbModal,
    private clubsService: ClubsService,
    private nav: NavbarService,
    public auth: AuthenticationService,
    private perfilService: PerfilService,
    private router: Router,
    private server: ServerService,
    private pipe: DatePipe,
    private bookService: ApiBooksService
  ) {}

  ngOnInit() {
    // para mostrar la barra de navegacion
    this.nav.show();
    // para coger los elementos del club
    // this.activedRoute.snapshot.params; para coger los parametros que nos trae la ruta activa
    const params = this.activedRoute.snapshot.params;
    console.log(params);
    this.listSociosClubs();
    // si la ruta activa nos da algun parametro que contenga id usamos el metodo getclub
    if (params.id) {
      this.clubsService.getClub(params.id).subscribe(
        res => {
          this.clubs = res;
          this.getUser();
          console.log(this.clubs);
        },
        err => console.error(err)
      );
    }
  }

  // PARA COGER LOS ELEMENTOS DEL USUARIO
  getUser() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.userCod.codUser = this.details.codUsuario.toString();
        if (this.clubs[0].presidente === this.details.codUsuario) {
          this.presidente = true;
        }
        this.getSocios();
        this.getMonthBook();
        this.geMonthBooks();
      },
      err => {
        console.error(err);
      }
    );
  }

  // BORRAR UN CLUB
  deleteClub(codClub: string) {
    this.clubsService.deleteClub(codClub).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
    console.log(codClub);
  }

  // ACTUALIZAR UN CLUB
  updateClub(codClub: number, nomClub: string, desClub: string, icono: string) {
    if (nomClub === '') {
      nomClub = this.clubs.nomClub;
    }
    if (desClub === '') {
      desClub = this.clubs.desClub;
    }
    this.clubsService.updateClub(codClub, nomClub, desClub, icono).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  // listar clubs  de socios
  listSociosClubs() {
    const paramsCod = this.activedRoute.snapshot.params;
    this.clubsService.listSociosClubs(paramsCod.id)
      .subscribe(
        res => {
          this.socios = res;
        },
        err => console.log(err)
      );
  }
  //  ELIMINAR UN SOCIO
  deleteSocio(codSocio: number) {
    this.clubsService.deleteSocio(codSocio).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
    location.reload(); // reload la pagina

  }


  joinClub() {
    this.clubsService
      .joinClub(this.details.codUsuario, this.clubs[0].codClub)
      .subscribe(res => {}, err => console.log(err));
  }

  leaveClub() {
    this.clubsService
      .leaveClub(this.details.codUsuario, this.clubs[0].codClub)
      .subscribe(res => {}, err => console.log(err));
  }

  getSocios() {
    this.clubsService
      .getSocios(this.details.codUsuario, this.clubs[0].codClub)
      .subscribe(
        res => {
          console.log(res);
          // tslint:disable-next-line: only-arrow-functions
          const arr = Object.keys(res).map(function(k) {
            return res[k];
          });
          console.log(arr);
          if (arr.length === 0) {
            this.perteneceClub = false;
          } else {
            this.perteneceClub = true;
          }
        },
        err => console.log(err)
      );
  }

  getBooks() {
    this.server.getBooks(this.userCod)
      .subscribe(
        res => {
          this.books = res;
          console.log(this.books);
        },
        err => console.log(err)
      );
  }

  getMonthBook() {
    const month = this.pipe.transform(this.now, 'MMMM-yyyy');
    this.clubsService.getLibroMes(month, this.clubs[0].codClub)
      .subscribe(
        res => {
          this.monthBook = res;
          this.tituloLibroMes = this.monthBook[0].titulo;
          this.portadaLibroMes = this.monthBook[0].portada;
        },
        err => console.log(err)
      );
  }

  bookMonth(idLib: string | number) {
// tslint:disable-next-line: no-bitwise
    const month = this.pipe.transform(this.now, 'MMMM-yyyy');
    this.clubsService.libroMes(this.details.codUsuario, this.clubs[0].codClub, idLib, month)
      .subscribe(res => { }, err => console.log(err));
    location.reload();
  }

  geMonthBooks() {
    const month = this.pipe.transform(this.now, 'MMMM-yyyy');
    this.clubsService.getMonthBooks(this.clubs[0].codClub, month)
      .subscribe(
        res => {
          this.booksMonths = res;
          console.log(this.booksMonths);
        },
        err => console.log(err)
      );
  }

  bookMonthDetails() {
    this.bookService.receiveBookId(this.monthBook[0]);
  }

  // PARA EL FUNCIONAMIENTO DE LOS MODALES, ABRIR Y CERRAR
  openLg(content: TemplateRef<any>) {
    this.modal.open(content, { size: 'lg' });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }
}
