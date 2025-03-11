import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TagTableComponent } from './tag-table/tag-table.component';
import { BookTableComponent } from './book-table/book-table.component';
import { BookFormComponent } from './book-form/book-form.component';
import { TagsService } from './tags.service';
import { BooksService } from './books.service';
import { Book } from './books';
import { Tag } from './tags';
import { BookSheetComponent } from './book-sheet/book-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title: string = 'book-manager';

  books: Book[] = [];
  tags: Tag[] = [];

  @ViewChild(TagTableComponent) tagTableComponent!: TagTableComponent;
  @ViewChild(BookTableComponent) bookTableComponent!: BookTableComponent;
  @ViewChild(BookFormComponent) bookFormComponent!: BookFormComponent;
  @ViewChild(BookSheetComponent) bookSheetComponent!: BookSheetComponent;

  constructor(private booksService: BooksService, private tagsService: TagsService) { }

  ngOnInit() {
    this.booksService.getBooks().toPromise().then(data => {
      this.books = data;
    }).catch(err => {
      console.error(err);
    });
    this.tagsService.getTags().toPromise().then(data => {
      this.tags = data;
    }).catch(err => {
      console.error(err);
    });
  }

  removeTag(tagId: number) {
    this.tagsService.removeTag(tagId).subscribe({
      next: (data) => {
        this.tags = this.tags.filter(t => t.id !== tagId);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.tags = this.tags.sort((a, b) => a.id! - b.id!);
      }
    });
  }

  addTag(description: string) {
    this.tagsService.addTag(description).subscribe({
      next: (data) => {
        this.tags.push(data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.tags = this.tags.sort((a, b) => a.id! - b.id!);
      }
    });
  }

  removeBook(bookId: number) {
    this.booksService.removeBook(bookId).subscribe({
      next: (data) => {
        this.books = this.books.filter(b => b.id !== bookId);
      },
      error: (err) => {
        console.error("Delete failed", err);
      },
      complete: () => {
        this.books = this.books.sort((a, b) => a.id! - b.id!);
        if (this.bookFormComponent.formGroupBooks.value.id == bookId) {
          this.bookFormComponent.setFormAdd();
        }
        if (this.bookSheetComponent.books[this.bookSheetComponent.selectedIndex].id === bookId) {
          this.bookSheetComponent.selectBook(bookId);
        }
      }
    });
  }

  addBook(book: Book) {
    this.booksService.addBook(book).subscribe({
      next: (data) => {
        let book = data;
        book.tags = this.tags.filter(tag => data.tags.includes(tag.id));
        this.books.push(data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.books = this.books.sort((a, b) => a.id! - b.id!);
        this.bookFormComponent.setFormAdd();
      }
    });
  }

  editBook(book: Book) {
    console.log(book);
    this.booksService.editBook(book).subscribe({
      next: (data) => {
        let book = data;
        book.tags = this.tags.filter(tag => data.tags.includes(tag.id));
        const bookIndex: number = this.books.findIndex(b => b.id === data.id) ?? -1;
        if (bookIndex !== undefined && bookIndex !== null) {
          this.books![bookIndex] = data;
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.bookFormComponent.setFormAdd();
      }
    });
  }
}
