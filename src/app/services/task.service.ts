import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  score: number;
  areaId: string | null;
  subareaId: string | null;
  daysOfTheWeek: number[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tarefas';

  constructor() { }

  createTask(taskData: Task): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskData);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, taskData: Task): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, taskData);
  }
}
