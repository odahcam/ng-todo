import { Component, OnInit } from '@angular/core';
import { ToDo } from './to-do';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

  toDos: ToDo[] = [new ToDo('clean the house'), new ToDo('buy milk')];

  input = '';

  submitted = false;

  deleteItem(i: number) {
    // note delete doesn't work: https://stackoverflow.com/a/40462431/2653503
    this.toDos.splice(i, 1);
  }

  addItem() {

    this.submitted = true;

    if (this.input === '') {
      return;
    }

    this.toDos = this.toDos.concat(new ToDo(this.input));
    this.input = '';
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
