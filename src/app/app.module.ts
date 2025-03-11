import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagTableComponent } from './tag-table/tag-table.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookTableComponent } from './book-table/book-table.component';
import { BookSheetComponent } from './book-sheet/book-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    TagFormComponent,
    TagTableComponent,
    BookFormComponent,
    BookTableComponent,
    BookSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
