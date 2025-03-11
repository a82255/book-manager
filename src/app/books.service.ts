import { Injectable } from '@angular/core';
import { BookApiService } from './book-api.service';
import { Observable } from 'rxjs';
import { Book } from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private bookApiService: BookApiService) { }

  getBooks(): Observable<any[]> {
    return this.bookApiService.getBooks();
  }

  addBook(book: Book): Observable<any> {
    return this.bookApiService.addBook(book);
  }

  removeBook(id: number) {
    return this.bookApiService.removeBook(id);
  }

  editBook(book: Book): Observable<any> {
    return this.bookApiService.editBook(book);
  }
}
