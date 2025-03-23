import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-add-item.component.html',
  styleUrl: './form-add-item.component.css'
})
export class FormAddItemComponent {

  title: string = '';
  score: number = 1;
  areaId: string | null = null;
  subareaId: string | null = null;

  @Input() 
  areas: any[] = [];

  subareas = [{ id: 'uuid-da-subarea-1', name: 'Subárea 1' }, { id: 'uuid-da-subarea-2', name: 'Subárea 2' }];

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['areas'] && this.areas.length > 0) {
      console.log('Áreas recebidas:', this.areas);
      this.areaId = this.areas[0].id;
    }
  }

  onSubmit() {
    const newTask = {
      title: this.title,
      score: this.score,
      areaId: this.areaId ? this.areaId : null,
      subareaId: this.subareaId ? this.subareaId : null,
      daysOfTheWeek: [1, 2, 3, 4, 5, 6, 7]
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
