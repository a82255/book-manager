import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Tag } from '../tags';

@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.css']
})
export class TagTableComponent {
  @Input() tags: Tag[] = [];
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();

  // Remover uma tag da lista pelo ID
  removeTag(id: number) {
    this.tagRemoved.emit(id);
  }
}
