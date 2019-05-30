import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleSearchService {

  apiKey = 'AIzaSyAinzO3h7YFdiAhYIywctvpYpLmhcjEQOM';
  apiCX = '008898672547044007408:m6nehwgknfq';
// tslint:disable-next-line: max-line-length
  baseUrl = `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.apiCX}&searchType=image&fileType=jpg&imgSize=medium&alt=json&q=`;
  URI: any;

  constructor(private httpClient: HttpClient) { }

  getImagesByTitle(title: string) {
    return this.httpClient.get(`${this.baseUrl}${title}`);
  }

  getTextByTitle(title: string) {
    return this.httpClient.get(`localhost:3000/home/wiki/${title}`);
  }


}
