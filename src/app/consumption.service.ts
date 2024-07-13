import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consumption } from './consumption.Interface'; 

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private apiUrl = 'http://localhost:3000/light'; 

  constructor(private http: HttpClient) {}

  getLightConsumption(): Observable<Consumption[]> {
    return this.http.get<Consumption[]>(this.apiUrl);
  }

  createLightConsumption(consumption: Consumption): Observable<Consumption> {
    return this.http.post<Consumption>(this.apiUrl, consumption);
  }

  updateLightConsumption(id: number, consumption: Consumption): Observable<Consumption> {
    return this.http.patch<Consumption>(`${this.apiUrl}/${id}`, consumption);
  }

  deleteLightConsumption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLightConsumptionById(id: number): Observable<Consumption> {
    return this.http.get<Consumption>(`${this.apiUrl}/${id}`);
  }
}
