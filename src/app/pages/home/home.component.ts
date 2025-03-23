import { Component } from '@angular/core';
import { FormAddItemComponent } from '../../components/form-add-item/form-add-item.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';
import { Area, AreaService } from '../../services/area.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MenuTitleComponent, FormAddItemComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  areas: Area[] = [];
  
  constructor(private areaService: AreaService) {}

  ngOnInit() {
    this.areaService.getAreas().subscribe(
      (data) => {
        this.areas = data;
      },
      (error) => {
        console.error('Erro ao carregar áreas:', error);
      }
    );
  }

}
