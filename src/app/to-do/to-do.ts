export class ToDo {

  constructor(item: string) {
    this.title = item;
  }

  userId: number;
  id: number;
  title: string;
  completed: boolean = false;
}
