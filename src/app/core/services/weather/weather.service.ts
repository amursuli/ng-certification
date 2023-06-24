import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { WeatherDto } from '../../models/weather-dto';
import { catchError } from 'rxjs/operators';
import { handleApiError } from '../../../shared/utils/handleError';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiUrlWeather: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByZipcode(zipcode: number): Observable<WeatherDto> {
    let params = new HttpParams();
    params = params.append('zip', zipcode);
    return this.http.get<WeatherDto>(this.apiUrlWeather, { params }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    handleApiError(error);
    return throwError(() => error);
  }
}
