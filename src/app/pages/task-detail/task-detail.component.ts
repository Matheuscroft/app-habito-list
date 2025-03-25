import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Area, AreaService } from '../../services/area.service';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  task: Task | null = null;
  area: Area | null = null;
  areas: string[] = ['Área 1', 'Área 2', 'Área 3'];
  subareas: string[] = ['Subárea 1', 'Subárea 2', 'Subárea 3'];
  isEditing: { [key: string]: boolean } = {};

  constructor(private taskService: TaskService, private areaService: AreaService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTaskById(taskId).subscribe({
        next: (task) => {
          this.task = task;
          this.isEditing = {
            title: false,
            score: false,
            areaId: false,
            subareaId: false
          };
          if (this.task.areaId) {
            this.areaService.getAreaById(this.task.areaId).subscribe({
              next: (area) => {
                this.area = area;
              },
              error: (error) => {
                console.error('Erro ao carregar área:', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Erro ao carregar tarefa:', error);
        }
      });
    }
  }

  toggleEdit(prop: keyof Task): void {
    this.isEditing[prop as string] = !this.isEditing[prop as string];
  }

  updateTask<K extends keyof Task>(prop: K, value: Task[K]): void {
    if (this.task) {
      this.task[prop] = value;
      this.taskService.updateTask(this.task.id!, this.task).subscribe({
        next: (response) => {
          console.log('Tarefa atualizada com sucesso:', response);
          this.isEditing[prop as string] = false;
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
        }
      });
    }
  }

  getAreaColor(): string {
    return this.area ? this.area.color : '#ffffff';
  }

  goBack(): void {
    window.history.back();
  }

}
