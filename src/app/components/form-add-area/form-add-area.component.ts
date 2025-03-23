import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Area, AreaService } from '../../services/area.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-add-area',
  imports: [FormsModule],
  templateUrl: './form-add-area.component.html',
  styleUrl: './form-add-area.component.css'
})
export class FormAddAreaComponent {

  @Input() areas: Area[] = [];
  @Output() areaAdded = new EventEmitter<Area>();

  newArea: Partial<Area> = { name: '', color: '#000000' };

  constructor(private areaService: AreaService) {}

  addArea() {
    if (!this.newArea.name?.trim()) return;

    this.areaService.addArea(this.newArea as Area).subscribe((createdArea) => {
      this.areaAdded.emit(createdArea);
      this.newArea = { name: '', color: '#000000' };
    });
  }

  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addArea();
    }
  }

}
