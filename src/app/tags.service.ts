import { Injectable } from '@angular/core';
import { BookApiService } from './book-api.service';
import { Observable } from 'rxjs';
import { Tag } from './tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private bookApiService: BookApiService) {

  }

  getTags(): Observable<any[]> {
    return this.bookApiService.getTags();
  }

  addTag(description: string): Observable<any> {
    return this.bookApiService.addTag(description);
  }

  removeTag(id: number) {
    return this.bookApiService.removeTag(id);
  }
}
