import { Component } from '@angular/core';
import { FormAddItemComponent } from '../../components/form-add-item/form-add-item.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';
import { Area, AreaService } from '../../services/area.service';
import { CommonModule } from '@angular/common';
import { FormAddAreaComponent } from '../../components/form-add-area/form-add-area.component';
import { AreasListComponent } from '../../components/areas-list/areas-list.component';
import { Task, TaskService } from '../../services/task.service';
import { Subarea, SubareaService } from '../../services/subarea.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MenuTitleComponent, FormAddItemComponent, TaskListComponent, FormAddAreaComponent, AreasListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  areas: Area[] = [];
  tasks: Task[] = [];
  subareas: Subarea[] = [];
  isLoading = true;
  
  constructor(private areaService: AreaService, private taskService: TaskService, private subareaService: SubareaService) {}

  ngOnInit() {
    this.areaService.getAreas().subscribe(
      (data) => {
        this.areas = data;
      },
      (error) => {
        console.error('Erro ao carregar áreas:', error);
      }
    );

    this.loadTasks();
    this.loadSubareas();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  loadSubareas() {
    this.subareaService.getSubareas().subscribe(
      (data) => {
        this.subareas = data;
      },
      (error) => {
        console.error('Erro ao carregar subáreas:', error);
      }
    );
  }

  onAreaAdded(newArea: Area) {
    this.areas.push(newArea);
  }

  onTaskAdded(newTask: Task) {
    this.tasks.push(newTask);
  }

  onTaskDeleted(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

}
