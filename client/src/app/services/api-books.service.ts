import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// google book api service
export class ApiBooksService {

  apiKey = 'AIzaSyAinzO3h7YFdiAhYIywctvpYpLmhcjEQOM';
  baseUrl = `https://www.googleapis.com/books/v1/volumes?&key=${this.apiKey}&startIndex=0&maxResults=40&q=`;
  goodUrl = `https://www.goodreads.com/book/isbn/`;
  URI: any;
  bookId;

  constructor(private httpClient: HttpClient) { }

  getBooksByTitle(title: string) {
    return this.httpClient.get(`${this.baseUrl}intitle:${title}`);
  }

  getBooksByAutor(autor: string) {
    return this.httpClient.get(`${this.baseUrl}inauthor:${autor}`);
  }

  getBooksByISBN(isbn: string) {
    return this.httpClient.get(`${this.baseUrl}isbn:${isbn}`);
  }

  getBooksByID(id: string) {
    return this.httpClient.get(`${this.baseUrl}id:${id}`);
  }

  getBooksByISBNGood(ibsn: string) {
    return this.httpClient.get(`${this.goodUrl}${ibsn}?key=4HHzbq2oexZf5EPCwOig`);
  }
  // send books to other components
  receiveBookId(book: any) {
    this.bookId = book;
  }

  sendBookId(): Array<any> {
    return this.bookId;
  }

}
