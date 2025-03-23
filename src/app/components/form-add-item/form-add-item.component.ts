import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-form-add-item',
  imports: [FormsModule],
  templateUrl: './form-add-item.component.html',
  styleUrl: './form-add-item.component.css'
})
export class FormAddItemComponent {

  title: string = '';
  score: number = 1;
  areaId: string | null = null;
  subareaId: string | null = null;

  areas = [{ id: 'uuid-da-area-1', nome: 'Área 1' }, { id: 'uuid-da-area-2', nome: 'Área 2' }];
  subareas = [{ id: 'uuid-da-subarea-1', nome: 'Subárea 1' }, { id: 'uuid-da-subarea-2', nome: 'Subárea 2' }];

  constructor(private taskService: TaskService) {}

  onSubmit() {
    const newTask = {
      title: this.title,
      score: this.score,
      areaId: this.areaId ? this.areaId : null,
      subareaId: this.subareaId ? this.subareaId : null,
      daysOfTheWeek: [2, 4, 6]
    };

    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        console.log('Tarefa criada com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao criar tarefa:', error);
      }
    });

    console.log('Tarefa criada:', newTask);

  }
}
