import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Area } from '../../services/area.service';
import { Subarea } from '../../services/subarea.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];
  @Input() areas: Area[] = [];
  @Input() subareas: Subarea[] = [];
  @Input() isLoading = true;
  @Output() taskDeleted = new EventEmitter<string>();

  constructor(private taskService: TaskService, private router: Router) {}

  getAreaName(areaId: string): string {
    const area = this.areas.find(a => a.id === areaId);
    return area ? area.name : 'Área desconhecida';
  }

  getAreaColor(areaId: string): string {
    const area = this.areas.find(a => a.id === areaId);
    return area ? area.color : 'gray';
  }

  getSubareaName(subareaId: string): string {
    const subarea = this.subareas.find(s => s.id === subareaId);
    return subarea ? subarea.name : 'Subárea desconhecida';
  }

  navigateToTaskDetail(taskId: string): void {
    this.router.navigate(['/task', taskId]);
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`Tarefa com ID: ${taskId} deletada com sucesso.`);
        this.taskDeleted.emit(taskId);
      },
      error: (error) => {
        console.error('Erro ao deletar tarefa:', error);
      }
    });
  }

}
