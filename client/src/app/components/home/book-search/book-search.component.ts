import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiBooksService } from 'src/app/services/api-books.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../../models/Book';
import { ServerService } from '../../../services/server.service';
import { NavbarService } from '../../../services/navbar.service';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
// component that search for books
export class BookSearchComponent implements OnInit {
  books: any[] = [];
  booksID: any[] = [];
  bookAPI;
  modalRef: BsModalRef;
  userDetails: UserDetails;

  titleSel = true;
  autorSel = false;
  isbnSel = false;
  search = false;

  id = '';
  title = '';
  autor = '';
  isbn = '';
  busqueda = 'Título';
  results: any;

  book: Book = {
    codUser: '',
    isbn: '',
    titulo: '',
    genero: '',
    portada: '',
    anoPublicacion: '',
    paginas: '',
    autor: '',
    descripcion: '',
    estado: '',
    editorial: ''
  };

  constructor(
    private bookservice: ApiBooksService,
    private modalService: BsModalService,
    private modal: NgbModal,
    private server: ServerService,
    private nav: NavbarService,
    private user: AuthenticationService
  ) {
    this.searchByTitle();
    this.searchByAuthor();
    this.searchByISBN();
  }
  // book searchs
  searchByTitle() {
    if (this.title === '') {
      return;
    }
    this.search = true;
    this.bookservice.getBooksByTitle(this.title).subscribe(
      res => {
        // tslint:disable-next-line: only-arrow-functions
        const arr = Object.keys(res).map(function(k) {
          return res[k];
        });
        console.log(arr);
        this.books = arr[2];
      },
      err => console.log(err)
    );
  }

  searchByAuthor() {
    if (this.autor === '') {
      return;
    }
    this.search = true;
    this.bookservice.getBooksByAutor(this.autor).subscribe(
      res => {
        // tslint:disable-next-line: only-arrow-functions
        const arr = Object.keys(res).map(function(k) {
          return res[k];
        });
        console.log(arr);
        this.books = arr[2];
      },
      err => console.log(err)
    );
  }

  searchByISBN() {
    if (this.isbn === '') {
      return;
    }
    this.search = true;
    this.bookservice.getBooksByISBN(this.isbn).subscribe(
      res => {
        // tslint:disable-next-line: only-arrow-functions
        const arr = Object.keys(res).map(function(k) {
          return res[k];
        });
        console.log(arr);
        this.books = arr[2];
      },
      err => console.log(err)
    );
  }
  // select the type of search
  select(type: string): void {
    if (type === 'title') {
      this.autorSel = false;
      this.isbnSel = false;
      this.titleSel = true;
      this.busqueda = 'Título';
    }
    if (type === 'autor') {
      this.autorSel = true;
      this.isbnSel = false;
      this.titleSel = false;
      this.busqueda = 'Autor';
    }
    if (type === 'isbn') {
      this.autorSel = false;
      this.isbnSel = true;
      this.titleSel = false;
      this.busqueda = 'ISBN';
    }
    this.search = false;
  }
  // Modals controllers
  // tslint:disable-next-line: no-shadowed-variable
  openModalByID(template: TemplateRef<any>, id: string) {
    this.bookservice.getBooksByISBN(id).subscribe(
      res => {
        // tslint:disable-next-line: only-arrow-functions
        const arr = Object.keys(res).map(function(k) {
          return res[k];
        });
        this.booksID = arr[2];
      },
      err => console.log(err)
    );
    this.openModal(template);
  }

  // tslint:disable-next-line: no-shadowed-variable
  openModal(template: TemplateRef<any>) {
    this.booksID = [];
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    const modalRef = this.modalService.hide(1);
  }

  // tslint:disable-next-line: no-shadowed-variable
  openStackedModal(template: TemplateRef<any>) {
    const modalRef = this.modal.open(template, {
      centered: true,
      size: 'sm'
    });
  }
  // save a book in the database
  saveBook() {
    this.book.codUser = this.userDetails.codUsuario.toString();
    this.book.isbn = this.booksID[0].volumeInfo.industryIdentifiers[0].identifier;
    this.book.titulo = this.booksID[0].volumeInfo.title;
    this.book.genero = 'Fantasía';
    this.booksID[0].volumeInfo.imageLinks
      ? (this.book.portada = this.booksID[0].volumeInfo.imageLinks.thumbnail)
      : (this.book.portada = '');
    this.book.anoPublicacion = this.booksID[0].volumeInfo.publishedDate;
    this.book.paginas = this.booksID[0].volumeInfo.pageCount;
    this.booksID[0].volumeInfo.authors
      ? (this.book.autor = this.booksID[0].volumeInfo.authors[0])
      : (this.book.autor = 'autor no disponible');
    this.booksID[0].volumeInfo.description
      ? (this.book.descripcion = this.booksID[0].volumeInfo.description)
      : (this.book.descripcion = '');
    this.book.estado = 'Leido';
    this.booksID[0].volumeInfo.publisher
      ? (this.book.editorial = this.booksID[0].volumeInfo.publisher)
      : (this.book.editorial = 'Sin editorial');

    this.booksID[0].volumeInfo.language
      ? (this.book.idioma = this.booksID[0].volumeInfo.language)
      : (this.book.idioma = 'ES');

    this.server
      .saveBook(this.book)
      .subscribe(res => {}, err => console.log(err));
  }

  ngOnInit() {
    this.nav.show();
    this.user.profile().subscribe(
      user => {
        this.userDetails = user;
      },
      err => {
        console.error(err);
      }
    );
  }
}
