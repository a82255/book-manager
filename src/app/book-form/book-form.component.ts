import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Book } from './../books';
import { Tag } from './../tags';
import { InputType } from '../InputType';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BookFormComponent {
  @Input() tags: Tag[] = [];
  @Input() books: Book[] = [];
  @Output() bookAdded: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() bookEdited: EventEmitter<Book> = new EventEmitter<Book>();

  inputType: InputType = InputType.Insert;

  idValidationError: string = "";
  titleValidationError: string = "";
  authorValidationError: string = "";
  priceValidationError: string = "";
  discountValidationError: string = "";

  formGroupBooks: FormGroup = this.formBuilder.group({
    id: this.formBuilder.control("", [Validators.pattern("[0-9]+")]),
    title: this.formBuilder.control("", [Validators.pattern("[a-zA-Z0-9]+")]),
    author: this.formBuilder.control("", [Validators.pattern("[a-zA-Z0-9]+")]),
    price: this.formBuilder.control("", [Validators.pattern("^[+-]?(\d*\.)?\d+$")]),
    discount: this.formBuilder.control("", [Validators.pattern("^[+-]?(\d*\.)?\d+$")]),
    tags: this.formBuilder.array(this.tags.map(() => false))
  });

  constructor(private formBuilder: FormBuilder) { }

  setFormAdd() {
    this.formGroupBooks.reset();
    this.inputType = InputType.Insert;
  }

  setFormEdit(id: number) {
    let book = this.books?.find(book => book.id === id);

    this.formGroupBooks.get("id")?.setValue(book?.id);
    this.formGroupBooks.get("title")?.setValue(book?.title);
    this.formGroupBooks.get("author")?.setValue(book?.author);
    this.formGroupBooks.get("price")?.setValue(book?.price);
    this.formGroupBooks.get("discount")?.setValue(book?.discount);

    this.selectedTagOptions.clear();
    book?.tags.forEach(tag => {
      this.selectedTagOptions.push(this.formBuilder.control(tag.id));
    });

    this.inputType = InputType.Edit;
  }

  get selectedTagOptions(): FormArray {
    return this.formGroupBooks.get('tags') as FormArray;
  }

  toggleSelection(tagId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedTagOptions.push(this.formBuilder.control(tagId));
    } else {
      const index = this.selectedTagOptions.controls.findIndex(ctrl => ctrl.value === tagId);
      this.selectedTagOptions.removeAt(index);
    }
  }

  validateform() {
    let book = this.formGroupBooks.value;

    console.log(this.formGroupBooks.value);

    let validate = true;
    if (book.title === "") {
      validate = false;
      this.titleValidationError = "Empty Field.";
    } else {
      this.titleValidationError = "";
    }
    if (book.author === "") {
      validate = false;
      this.authorValidationError = "Empty Field.";
    } else {
      this.authorValidationError = "";
    }
    if (book.price === "") {
      validate = false;
      this.priceValidationError = "Empty Field.";
    } else if (isNaN(book.price)) {
      validate = false;
      this.priceValidationError = "Must be a number."
    } else if (book.price < 0) {
      validate = false;
      this.priceValidationError = "Cannot be negative."
    } else {
      this.priceValidationError = "";
    }
    if (book.discount === "") {
      validate = false;
      this.discountValidationError = "Empty Field.";
    } else if (isNaN(book.discount)) {
      validate = false;
      this.discountValidationError = "Must be a number."
    } else if (book.discount < 0) {
      validate = false;
      this.discountValidationError = "Cannot be negative."
    } else {
      this.discountValidationError = "";
    }

    if (validate) {
      switch (this.inputType) {
        case InputType.Insert: {
          this.bookAdded.emit(book);
        } break;
        case InputType.Edit: {
          this.bookEdited.emit(book);
        } break;
        default: { } break;
      }
    }
  }
}
