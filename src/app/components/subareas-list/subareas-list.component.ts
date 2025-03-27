import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SubareaService } from '../../services/subarea.service';

@Component({
  selector: 'app-subareas-list',
  imports: [CommonModule],
  templateUrl: './subareas-list.component.html',
  styleUrl: './subareas-list.component.css'
})
export class SubareasListComponent {

  @Input() subareas: any[] = [];
  @Input() isLoading = true;
  @Input() canAddSubarea = true;
  @Output() subareaDeleted = new EventEmitter<string>();

  constructor(private subareaService: SubareaService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subareas']) {
      console.log('Subáreas recebidas:', this.subareas);
    }
  }

  deleteSubarea(subareaId: string): void {
    this.subareaService.deleteSubarea(subareaId).subscribe({
      next: () => {
        console.log('Subárea deletada:', subareaId);
        this.subareaDeleted.emit(subareaId);
      },
      error: (error) => {
        console.error('Erro ao deletar subárea:', error);
      }
    });
  }

}
