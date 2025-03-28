import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Area, AreaService } from '../../services/area.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-list',
  imports: [CommonModule],
  templateUrl: './areas-list.component.html',
  styleUrl: './areas-list.component.css'
})
export class AreasListComponent {

  @Input() areas: Area[] = [];
  @Output() areaDeleted = new EventEmitter<string>();
  isLoading = true;

  constructor(private router: Router, private areaService: AreaService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areas'] && changes['areas'].currentValue) {
      this.isLoading = this.areas.length === 0;
    }
  }

  navigateToAreaDetail(areaId: string): void {
    this.router.navigate(['/area', areaId]);
  }

  onDeleteArea(areaId: string, event: Event): void {
    event.stopPropagation();
    
      this.areaService.deleteArea(areaId).subscribe({
        next: () => {
          console.log(`Área com ID ${areaId} deletada com sucesso.`);
          this.areas = this.areas.filter(area => area.id !== areaId);
          this.areaDeleted.emit(areaId);
        },
        error: (err) => {
          console.error('Erro ao deletar a área:', err);
        }
      });
    
  }

}
