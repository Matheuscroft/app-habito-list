import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area, AreaService } from '../../services/area.service';
import { CommonModule } from '@angular/common';
import { FormAddSubareaComponent } from '../../components/form-add-subarea/form-add-subarea.component';
import { SubareasListComponent } from '../../components/subareas-list/subareas-list.component';

@Component({
  selector: 'app-area-detail',
  imports: [CommonModule, FormAddSubareaComponent, SubareasListComponent],
  templateUrl: './area-detail.component.html',
  styleUrl: './area-detail.component.css'
})
export class AreaDetailComponent {

  area: Area | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private areaService: AreaService) {}

  ngOnInit(): void {
    const areaId = this.route.snapshot.paramMap.get('id');
    if (areaId) {
      this.areaService.getAreaById(areaId).subscribe({
        next: (area) => {
          this.area = area;
        },
        error: (error) => {
          console.error('Erro ao carregar área:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
