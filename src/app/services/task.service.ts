import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { generateUniqueIdWithTimestamp } from "../utils/generate-unique-id-timestamp";
import { TaskStatusEnum } from "../enums/task-status.enum";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //Tarefas em A Fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTasks = this.todoTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
  );

  //Tarefas em Andamento
  private doingTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTasks = this.doingTasks$.asObservable( ).pipe(
    map((tasks) => structuredClone(tasks)),
  );

  //Tarefas em Concluído
  private doneTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTasks = this.doneTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
  );

  addTask(taskInfos: ITaskFormControls) {
    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };

    const currentList = this.todoTasks$.value;
    this.todoTasks$.next([...currentList, newTask]);
  }

  carregarListaAtualDeTodos() {
    console.log('Lista atual de TODOS: ', this.todoTasks$.value);
  }
}
