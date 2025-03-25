import { Component, Input, SimpleChanges } from '@angular/core';
import { Area } from '../../services/area.service';
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
  isLoading = true;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areas']) {
      this.isLoading = this.areas.length === 0;
    }
  }

  navigateToAreaDetail(areaId: string): void {
    this.router.navigate(['/area', areaId]);
  }

}
