import { HttpClient, HttpResponse } from '@angular/common/http';
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

  private apiUrl = 'https://api-abito-arcano-prd.up.railway.app/subareas';

  constructor(private http: HttpClient) {}

  getSubareas(): Observable<Subarea[]> {
    return this.http.get<Subarea[]>(this.apiUrl);
  }

  getSubareasByAreaId(areaId: string): Observable<Subarea[]> {
    return this.http.get<Subarea[]>(`${this.apiUrl}/area/${areaId}`);
  }

  deleteSubarea(subareaId: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/${subareaId}`, { observe: 'response', responseType: 'text' });
  }

  createSubarea(subarea: Omit<Subarea, 'id'>): Observable<Subarea> {
    return this.http.post<Subarea>(this.apiUrl, subarea);
  }

  getSubareaById(subareaId: string): Observable<Subarea> {
    return this.http.get<Subarea>(`${this.apiUrl}/${subareaId}`);
  }

}
