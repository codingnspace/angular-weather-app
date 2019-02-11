import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { pipe } from '@angular/core/src/render3';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  longitude: number = 38.9072;
  latitude: number = 77.0369;
  weatherUrl: string = `https://1miudhz7a9.execute-api.us-east-1.amazonaws.com/dev/forecast/${this.latitude},${this.longitude}`;


  
  constructor(private http: HttpClient) {}
  buildApiUrl = (time) => `${this.weatherUrl},${time}`;


  getWeather (dayWithOffset): Observable<any> {
    const apiUrl = this.buildApiUrl(dayWithOffset.dateHash);
    return this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          throw error;
        })
      )
  }
}
