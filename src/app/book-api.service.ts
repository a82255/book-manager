import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './books';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  private url = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/tags`);
  }

  addTag(description: string): Observable<any> {
    return this.http.post<any>(`${this.url}/api/tags`, {
      description: description
    });
  }

  removeTag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/tags/${id}`);
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/books`);
  }

  addBook({ title, author, tags, price, discount }: Book): Observable<any> {
    return this.http.post<any>(`${this.url}/api/books`, {
      title,
      author,
      tags,
      price,
      discount
    });
  }

  removeBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/books/${id}`);
  }

  editBook(book: Book): Observable<any> {
    console.log(book);
    return this.http.put<any>(`${this.url}/api/books/${book.id}`,
      book
    );
  }
}
