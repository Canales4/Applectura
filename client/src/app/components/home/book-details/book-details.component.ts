import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { ApiBooksService } from '../../../services/api-books.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../../services/server.service';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
// component that shows the book data from the database
export class BookDetailsComponent implements OnInit {
  bookInfo;
  pag: number;
  bookProgress = 0;
  book;
  favPath = 'https://img.icons8.com/wired/64/000000/add-to-favorites.png';
  bookPath = 'https://img.icons8.com/wired/64/000000/open-book.png';
  commPath = 'https://img.icons8.com/wired/64/000000/comments.png';
  modalRef: BsModalRef;
  bookPag;
  currentBookStatus: string;
  status: string[] = ['Leido', 'Próxima lectura', 'Leyendo'];
  userDet: UserDetails;

  // tslint:disable-next-line: max-line-length
  constructor(
    private nav: NavbarService,
    private apiBook: ApiBooksService,
    private modalService: BsModalService,
    private modal: NgbModal,
    private config: NgbModalConfig,
    private server: ServerService,
    private user: AuthenticationService
  ) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.nav.show();
    this.user.profile().subscribe(
      user => {
        this.userDet = user;
        this.getBook();
      },
      err => {
        console.error(err);
      }
    );
  }

  getBook() {
    this.bookInfo = this.apiBook.sendBookId();
    console.log(this.bookInfo.ISBN);
    this.server.getBookByISBN(this.bookInfo.ISBN).subscribe(
      res => {
        this.book = res;
        this.bookPag = this.book[0].paginas;
        this.pag = this.book[0].pagLec;
        this.currentBookStatus = this.book[0].estado;
        this.savePageCount(this.pag);
        console.log(this.book);
      },
      err => console.log(err)
    );
  }
  // hover icon fuctions
  hoverFav() {
    this.favPath = '../../../../assets/icons8-add-to-favorites-64.png';
  }

  hoverFavLeav() {
    this.favPath =
      'https://img.icons8.com/wired/64/000000/add-to-favorites.png';
  }

  hoverBook() {
    this.bookPath = '../../../../assets/icons8-open-book-64.png';
  }

  hoverBookLeav() {
    this.bookPath = 'https://img.icons8.com/wired/64/000000/open-book.png';
  }

  hoverComm() {
    this.commPath = '../../../../assets/icons8-comments-64.png';
  }

  hoverCommLeav() {
    this.commPath = 'https://img.icons8.com/wired/64/000000/comments.png';
  }

  openModal(template: TemplateRef<any>) {
    const modalRef = this.modal.open(template);
  }

  savePageCount(pag: number) {
    this.bookProgress = (100 * pag) / this.bookPag;
  }

  updateStatus() {
    switch (this.currentBookStatus) {
      case 'Leido':
// tslint:disable-next-line: max-line-length
        this.server.updateBookStatus(this.currentBookStatus, this.bookPag, this.book[0].codTitulo, this.userDet.codUsuario, this.book[0].nomAutor)
          .subscribe(res => {}, err => console.log(err));
        this.pag = this.book[0].paginas;
        break;
      case 'Próxima lectura':
// tslint:disable-next-line: max-line-length
        this.server.updateBookStatus(this.currentBookStatus, 0, this.book[0].codTitulo, this.userDet.codUsuario, this.book[0].nomAutor)
          .subscribe(res => {}, err => console.log(err));
        this.pag = 0;
        break;
      case 'Leyendo':
// tslint:disable-next-line: max-line-length
        this.server.updateBookStatus(this.currentBookStatus, this.pag, this.book[0].codTitulo, this.userDet.codUsuario, this.book[0].nomAutor)
          .subscribe(res => {}, err => console.log(err));
        break;
    }

  }

  addFav() {
    this.server.addfavorite(this.book[0].codLibro, this.userDet.codUsuario)
      .subscribe(res => {}, err => console.log(err));
  }
}
