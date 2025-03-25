import { Component, Input } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-add-subarea',
  imports: [FormsModule],
  templateUrl: './form-add-subarea.component.html',
  styleUrl: './form-add-subarea.component.css'
})
export class FormAddSubareaComponent {

  @Input() areaId: string = '';
  subareaName: string = '';

  constructor(private areaService: AreaService) {}

  addSubarea(): void {
    if (this.subareaName.trim()) {
      // Adicione a lógica para adicionar a subárea aqui
      console.log(`Adicionando subárea: ${this.subareaName} à área: ${this.areaId}`);
      this.subareaName = '';
    }
  }

}
