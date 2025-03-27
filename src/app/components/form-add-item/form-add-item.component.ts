import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Subarea, SubareaService } from '../../services/subarea.service';

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
  @Output() taskAdded = new EventEmitter<any>();

  subareas: Subarea[] = [];

  constructor(private taskService: TaskService, private subareaService: SubareaService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['areas'] && this.areas.length > 0) {
      console.log('Áreas recebidas:', this.areas);
      this.areaId = this.areas[0].id;
      if (this.areaId) {
        this.loadSubareas(this.areaId);
      }
    }
  }

  loadSubareas(areaId: string): void {
    this.subareaService.getSubareasByAreaId(areaId).subscribe({
      next: (subareas) => {
        this.subareas = subareas;
        console.log('Subáreas carregadas:', this.subareas);
      },
      error: (error) => {
        console.error('Erro ao carregar subáreas:', error);
      }
    });
  }

  onAreaChange(): void {
    if (this.areaId) {
      this.loadSubareas(this.areaId);
    }
  }

  onSubmit() {

    if (this.subareaId && !this.subareas.some(subarea => subarea.id === this.subareaId)) {
      console.error('A subárea fornecida não pertence à área fornecida.');
      return;
    }

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
        this.taskAdded.emit(response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao criar tarefa:', error);
      }
    });

    console.log('Tarefa criada:', newTask);

  }

  resetForm() {
    this.title = '';
    this.score = 1;
    this.areaId = this.areas.length > 0 ? this.areas[0].id : null;
    this.subareaId = null;
    if (this.areaId) {
      this.loadSubareas(this.areaId);
    }
  }
}
