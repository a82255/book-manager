import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../books';

@Component({
  selector: 'app-book-sheet',
  templateUrl: './book-sheet.component.html',
  styleUrls: ['./book-sheet.component.css']
})
export class BookSheetComponent implements OnInit {
  @Input() books: Book[] = [];
  selectedIndex: number = 0;

  ngOnInit(): void {
    this.selectedIndex = 0;
  }

  // Definir a ficha pelo objeto dado
  selectBook(id: number) {
    this.selectedIndex = this.books.findIndex(e => e.id == id);
  }

  showNextBook() {
    if (++this.selectedIndex! >= this.books.length) {
      this.selectedIndex = 0;
    }
  }

  showPreviousBook() {
    if (--this.selectedIndex! < 0) {
      this.selectedIndex = this.books.length - 1;
    }
  }
}
