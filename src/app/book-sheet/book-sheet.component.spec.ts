import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSheetComponent } from './book-sheet.component';

describe('BookSheetComponent', () => {
  let component: BookSheetComponent;
  let fixture: ComponentFixture<BookSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSheetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
