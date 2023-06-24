import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ForecastDto } from '../../models/forecast-dto';
import { handleApiError } from '../../../shared/utils/handleError';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  apiUrlForecast: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getForecastByZipcode(zipcode: number): Observable<ForecastDto> {
    let params = new HttpParams();
    params = params.append('zip', zipcode);
    return this.http.get<ForecastDto>(this.apiUrlForecast, { params }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    handleApiError(error);
    return throwError(() => error);
  }
}
