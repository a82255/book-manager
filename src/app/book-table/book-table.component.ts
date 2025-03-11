import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from './../books';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent {
  @Output() bookRemoved: EventEmitter<number> = new EventEmitter<number>();
  @Output() bookSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() bookSetEdit: EventEmitter<number> = new EventEmitter<number>();

  @Input() books: Book[] = [];

  // Selecionar um livro da lista, para remeter para a ficha
  selectBook(id: number) {
    this.bookSelected.emit(id);
  }

  // Selecionar um livro da lista, para definir no formulário
  editBook(id: number) {
    this.bookSetEdit.emit(id);
  }

  // Remover uma tag da lista pelo ID
  removeBook(id: number) {
    this.bookRemoved.emit(id);
  }
}
