import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ToDo } from '../to-do';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent {

  @Input()
  toDo: ToDo = new ToDo('');

  @Output()
  deleted: EventEmitter<any> = new EventEmitter();

  deleteItem() {
    this.deleted.emit();
  }
}
