import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subarea, SubareaService } from '../../services/subarea.service';

@Component({
  selector: 'app-form-add-subarea',
  imports: [FormsModule],
  templateUrl: './form-add-subarea.component.html',
  styleUrl: './form-add-subarea.component.css'
})
export class FormAddSubareaComponent {

  @Input() areaId: string = '';
  subareaName: string = '';
  @Output() subareaAdded = new EventEmitter<Subarea>();

  constructor(private subareaService: SubareaService) {}

  addSubarea(): void {
    if (this.subareaName.trim()) {
      const newSubarea: Omit<Subarea, 'id'> = { name: this.subareaName, areaId: this.areaId };
      this.subareaService.createSubarea(newSubarea).subscribe({
        next: (subarea) => {
          console.log(`Subárea adicionada: ${subarea.name}`);
          this.subareaName = '';
          this.subareaAdded.emit(subarea);
        },
        error: (error) => {
          console.error('Erro ao adicionar subárea:', error);
        }
      });
    }
  }
  

}
