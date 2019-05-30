import { ApiBooksService } from './../../../services/api-books.service';
import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthenticationService, UserDetails } from '../../../services/authentication.service';
import { Data } from '../../../models/Data';




@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
// component that lists the books from the database
export class BookListComponent implements OnInit {

  books;
  userDet: UserDetails;
  check = false;
  userCod: Data = {
    codUser: ''
  };

// tslint:disable-next-line: max-line-length
  constructor(private bookService: ServerService, private bookApi: ApiBooksService, public nav: NavbarService, private user: AuthenticationService) { }
  // get the books
  getBooks() {
    this.bookService.getBooks(this.userCod)
      .subscribe(
        res => {
          this.books = res;
          console.log(this.books);
        },
        err => console.log(err)
      );
  }

 // fuction that send books to other components
  sendBook(book: any) {
    this.bookApi.receiveBookId(book);
  }

  userData() {
    this.user.profile().subscribe(
      user => {
        this.userDet = user;
        this.userCod.codUser = this.userDet.codUsuario.toString();
        this.getBooks();
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.nav.show();
    this.userData();
  }


}
