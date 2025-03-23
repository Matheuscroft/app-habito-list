import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tarefas';

  constructor() { }

  createTask(taskData: { title: string; score: number; areaId: string | null; subareaId: string | null; daysOfTheWeek: number[] }): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskData);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
