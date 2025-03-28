import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Area, AreaService } from '../../services/area.service';
import { Subarea, SubareaService } from '../../services/subarea.service';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  task: Task | null = null;
  area: Area | null = null;
  subarea: Subarea | null = null;
  areas: Area[] = [];
  subareas: Subarea[] = [];
  filteredSubareas: Subarea[] = [];
  isEditing: { [key: string]: boolean } = {};

  @ViewChild('titleInput') titleInputRef!: ElementRef;
  @ViewChild('scoreInput') scoreInputRef!: ElementRef;
  @ViewChild('areaSelect') areaSelectRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('subareaSelect') subareaSelectRef!: ElementRef<HTMLSelectElement>;

  constructor(private taskService: TaskService, private areaService: AreaService, private subareaService: SubareaService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    this.areaService.getAreas().subscribe({
      next: (areas) => this.areas = areas,
      error: (error) => console.error('Erro ao carregar áreas:', error),
    });
  
    this.subareaService.getSubareas().subscribe({
      next: (subareas) => {
        this.subareas = subareas;
  
        if (this.task?.areaId) {
          this.filteredSubareas = this.subareas.filter(sub => sub.areaId === this.task?.areaId);
        }
      },
      error: (error) => console.error('Erro ao carregar subáreas:', error),
    });

    if (taskId) {
      this.loadTask(taskId);
    }
  }

  loadTask(taskId: string): void {
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
          this.loadArea(this.task.areaId);

          if (this.subareas.length > 0) {
            this.filteredSubareas = this.subareas.filter(sub => sub.areaId === this.task?.areaId);
          }
        }

        if (this.task.subareaId) {
          this.loadSubarea(this.task.subareaId);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar tarefa:', error);
      }
    });
  }

  loadArea(areaId: string): void {
    this.areaService.getAreaById(areaId).subscribe({
      next: (area) => {
        this.area = area;
      },
      error: (error) => {
        console.error('Erro ao carregar área:', error);
      }
    });
  }

  loadSubarea(subareaId: string): void {
    this.subareaService.getSubareaById(subareaId).subscribe({
      next: (subarea) => {
        this.subarea = subarea;
      },
      error: (error) => {
        console.error('Erro ao carregar subárea:', error);
      }
    });
  }

  toggleEdit(prop: keyof Task): void {
    this.isEditing[prop as string] = !this.isEditing[prop as string]
    if (this.isEditing[prop as string]) {
      setTimeout(() => {
        this.titleInputRef?.nativeElement.focus()
        this.areaSelectRef?.nativeElement.focus();
        this.subareaSelectRef?.nativeElement.focus();
        this.scoreInputRef?.nativeElement.focus();
      });
    };
  }

  updateTask<K extends keyof Task>(prop: K, value: Task[K]): void {
    if (this.task) {
      if (this.task[prop] !== value) {

        if (prop === 'areaId') {
          this.area = this.areas.find(area => area.id === value) || null;
          this.task.subareaId = null;
          this.subarea = null;

          this.filteredSubareas = this.subareas.filter(sub => sub.areaId === value);
        }

        if (prop === 'subareaId') {
          this.subarea = this.subareas.find(sub => sub.id === value) || null;
        }

        this.task[prop] = value;
        this.isEditing[prop as string] = false;
        this.taskService.updateTask(this.task.id!, this.task).subscribe({
          next: (response) => {
            console.log('Tarefa atualizada com sucesso:', response);
          },
          error: (error) => {
            console.error('Erro ao atualizar tarefa:', error);
          }
        });
      } else {
        this.isEditing[prop as string] = false;
      }
    }
  }

  onInputBlur(event: Event, prop: keyof Task): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.updateTask(prop, inputValue as Task[typeof prop]);
  }

  onSelectChange(event: Event, prop: keyof Task): void {
    const selectedValue = (event.target as HTMLSelectElement).value; 
    this.updateTask(prop, selectedValue); 
  }

  onBlur(prop: string): void {
    this.isEditing[prop] = false;
  }

  getAreaColor(): string {
    return this.area ? this.area.color : '#ffffff';
  }

  goBack(): void {
    window.history.back();
  }

}
