import { Component } from '@angular/core';
import { FormAddItemComponent } from '../../components/form-add-item/form-add-item.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';
import { Area, AreaService } from '../../services/area.service';
import { CommonModule } from '@angular/common';
import { FormAddAreaComponent } from '../../components/form-add-area/form-add-area.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MenuTitleComponent, FormAddItemComponent, TaskListComponent, FormAddAreaComponent],
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

  onAreaAdded(newArea: Area) {
    this.areas.push(newArea); // Atualiza lista localmente sem precisar recarregar
  }

}
