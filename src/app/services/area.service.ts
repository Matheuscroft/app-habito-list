import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  private apiUrl = 'http://localhost:8080/areas';

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }
}
