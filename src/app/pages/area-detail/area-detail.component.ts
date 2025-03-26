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

  constructor(private route: ActivatedRoute, private router: Router, private areaService: AreaService, private subareaService: SubareaService) {}

  ngOnInit(): void {
    const areaId = this.route.snapshot.paramMap.get('id');
    if (areaId) {
      this.areaService.getAreaById(areaId).subscribe({
        next: (area) => {
          this.area = area;
          console.log('Área carregada:', this.area);
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
