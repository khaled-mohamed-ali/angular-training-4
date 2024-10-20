import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  [x: string]: any;
private tasks = signal<Task[]>([])
allTasks = this.tasks.asReadonly();

 addTask(taskData: {title: string; description: string}) {
  const newTask: Task = {
  ...taskData,
  id: Math.random().toString(),
  status: 'OPEN',
};
  this.tasks.update((oldTasks) => [...oldTasks, newTask]);
}

onChangeTaskStatus(taskId: string, newStatus: TaskStatus) {
  this.tasks.update( (oldTask) => 
    oldTask.map((task) => task.id === taskId ? { ...task, status: newStatus }: task) 
  )
}
}
