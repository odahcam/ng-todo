import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class ToDoComponent {

  toDos: ToDo[] = [];

  toDos$: Observable<ToDo[]>;

  input = '';

  submitted = false;

  constructor(
    private readonly todo: ToDoService
  ) {
    this.toDos$ = this.todo.fetchToDos().pipe(tap(x => this.toDos = x));
  }

  deleteItem(toDo: ToDo) {
    this.todo.deleteToDo(toDo)
      .subscribe(() => this.toDos = this.toDos.filter(x => x.id !== toDo.id));
  }

  addItem() {

    this.submitted = true;

    if (this.input === '') {
      return;
    }

    const toDo = new ToDo(this.input);

    this.todo.saveToDo(toDo)
      .subscribe(savedToDo => { this.toDos = this.toDos.concat(savedToDo); this.input = ''; });
  }

  shouldBeHidden(
    valid: boolean,
    pristine: boolean,
    submitted: boolean
  ): boolean {

    if (submitted) {
      return valid;
    }

    return valid || pristine;
  }
}
