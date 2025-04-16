import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs';

export interface Area {
  id: string;
  name: string;
  color: string;
  subareas: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'https://api-abito-arcano.onrender.com/areas';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl, this.httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  getAreaById(id: string): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  addArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
  }

  deleteArea(areaId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${areaId}`);
  }

  updateArea(areaId: string, updatedArea: Area): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${areaId}`, updatedArea, this.httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}