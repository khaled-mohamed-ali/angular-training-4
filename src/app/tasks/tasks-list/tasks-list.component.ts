import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
   tasksItems = inject(TasksService);

  selectedFilter = signal<string>('all');
  // tasks = this.tasksItems.allTasks
  tasks = computed( ()=> {
    switch(this.selectedFilter()) {
      case 'all':
        return this.tasksItems.allTasks();
        case 'open':
          return this.tasksItems.allTasks().filter( (task: Task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksItems.allTasks().filter((task: Task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksItems.allTasks().filter((task: Task) => task.status === 'DONE');
        default:
          return this.tasksItems.allTasks()
    }
  })

  

  

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
