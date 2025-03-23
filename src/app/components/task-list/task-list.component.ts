import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: any[] = [];
  isLoading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
