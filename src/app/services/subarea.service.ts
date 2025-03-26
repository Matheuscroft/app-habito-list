import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Subarea {
  id: string;
  name: string;
  areaId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubareaService {

  private apiUrl = 'http://localhost:8080/subareas';

  constructor(private http: HttpClient) {}

  getSubareasByAreaId(areaId: string): Observable<Subarea[]> {
    return this.http.get<Subarea[]>(`${this.apiUrl}/area/${areaId}`);
  }

  deleteSubarea(subareaId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${subareaId}`);
  }
}
