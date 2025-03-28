import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area, AreaService } from '../../services/area.service';
import { CommonModule } from '@angular/common';
import { FormAddSubareaComponent } from '../../components/form-add-subarea/form-add-subarea.component';
import { SubareasListComponent } from '../../components/subareas-list/subareas-list.component';
import { Subarea, SubareaService } from '../../services/subarea.service';

@Component({
  selector: 'app-area-detail',
  imports: [CommonModule, FormAddSubareaComponent, SubareasListComponent],
  templateUrl: './area-detail.component.html',
  styleUrl: './area-detail.component.css'
})
export class AreaDetailComponent {

  area: Area | null = null;
  subareas: Subarea[] = [];
  isLoading = true;
  canAddSubarea = true;
  isEditing: { [key: string]: boolean } = {}

  constructor(private route: ActivatedRoute, private router: Router, private areaService: AreaService, private subareaService: SubareaService) {}

  ngOnInit(): void {
    const areaId = this.route.snapshot.paramMap.get('id');
    if (areaId) {
      this.areaService.getAreaById(areaId).subscribe({
        next: (area) => {
          this.area = area;
          console.log('Área carregada:', this.area);
          this.canAddSubarea = this.area.name !== 'Sem Categoria';
          this.loadSubareas(areaId);
        },
        error: (error) => {
          console.error('Erro ao carregar área:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadSubareas(areaId: string): void {
    this.subareaService.getSubareasByAreaId(areaId).subscribe({
      next: (subareas) => {
        this.subareas = subareas;
        console.log('Subáreas carregadas:', this.subareas);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar subáreas:', error);
        this.isLoading = false;
      }
    });
  }

  toggleEditName(): void {
    this.isEditing['name'] = true;
    setTimeout(() => {
      const input = document.querySelector('#nameInput') as HTMLInputElement;
      input?.focus();
    });
  }

  onNameBlur(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (this.area && inputValue && this.area.name !== inputValue) {
      this.area.name = inputValue;
  
      this.areaService.updateArea(this.area.id, this.area).subscribe({
        next: (updated) => {
          console.log(`Nome da área atualizado com sucesso:`, updated);
          this.area = updated;
        },
        error: (err) => {
          console.error('Erro ao atualizar o nome da área:', err);
        }
      });
    }
    this.isEditing['name'] = false;
  }

  toggleEditColor(): void {
    this.isEditing['color'] = true;
    setTimeout(() => {
      const input = document.querySelector('#colorInput') as HTMLInputElement;
      input?.focus();
    });
  }

  onColorBlur(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    if (this.area && inputValue && this.area.color !== inputValue) {
      this.area.color = inputValue;
  
      this.areaService.updateArea(this.area.id, this.area).subscribe({
        next: (updated) => {
          console.log(`Cor da área atualizada com sucesso:`, updated);
          this.area = updated;
        },
        error: (err) => {
          console.error('Erro ao atualizar a cor da área:', err);
        }
      });
    }
    this.isEditing['color'] = false;
  }

  handleSubareaDeleted(subareaId: string): void {
    this.subareas = this.subareas.filter(subarea => subarea.id !== subareaId);
  }

  handleSubareaAdded(subarea: Subarea): void {
    this.subareas.push(subarea);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
