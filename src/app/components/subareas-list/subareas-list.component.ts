import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-subareas-list',
  imports: [CommonModule],
  templateUrl: './subareas-list.component.html',
  styleUrl: './subareas-list.component.css'
})
export class SubareasListComponent {

  @Input() subareas: any[] = [];
  isLoading = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subareas']) {
      this.isLoading = this.subareas.length === 0;
    }
  }

}
