import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  taskId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
    });
  }

}
