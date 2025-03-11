import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputType } from './../InputType';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {
  @Output() tagAdded: EventEmitter<string> = new EventEmitter<string>();

  formGroupTags: FormGroup = this.formBuilder.group({
    id: this.formBuilder.control("", [Validators.pattern("[0-9]+")]),
    description: this.formBuilder.control("", [Validators.pattern("[a-zA-Z0-9]+")])
  });

  formTagInputType: InputType = InputType.Insert;
  idValidationError: string = "";
  descriptionValidationError: string = "";

  constructor(private formBuilder: FormBuilder) { }

  private idValueChangeCheck = new Subject();

  ngOnInit(): void {
    this.formGroupTags.get("id")?.valueChanges.subscribe({
      next: (data) => {
        if (isNaN(data)) {
          this.idValidationError = "Not a number.";
        } else {
          this.idValidationError = "";
        }
      }
    });
  }

  clearForm() {
    this.formGroupTags.reset();
    this.descriptionValidationError = "";
    this.idValidationError = "";
  }

  validateform() {
    let description: string = this.formGroupTags.get("description")?.value;
    if (description === "") {
      this.descriptionValidationError = "Empty Field.";
    } else {
      this.tagAdded.emit(description);
      this.descriptionValidationError = "";
      this.formGroupTags.reset();
    }
  }
}
