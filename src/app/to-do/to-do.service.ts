import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ToDo } from './to-do';
import { ApiBaseParams } from '../api-base-params';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private baseUri = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * Fetches one or lots of ToDos.
   */
  fetchToDos(filter?: ApiBaseParams): Observable<ToDo[]> {

    const params: ApiBaseParams = {
      _limit: '20',
    };

    if (filter) {
      Object.assign(params, filter);
    }

    return this.http.get<ToDo[]>(`${this.baseUri}`, { params });
  }

  /**
   * Saves a ToDo via API.
   */
  saveToDo(toDo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.baseUri, toDo)
      .pipe(mergeMap(x => of(Object.assign(new ToDo(''), toDo, x))));
  }

  /**
   * Deletes the ToDo.
   */
  deleteToDo(toDo: ToDo): Observable<void> {
    return this.http.delete<void>(`${this.baseUri}${toDo.id}`);
  }
}
