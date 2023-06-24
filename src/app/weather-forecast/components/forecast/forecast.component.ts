import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ForecastDto, List } from '../../../core/models/forecast-dto';
import { ForecastService } from '../../../core/services/forecast/forecast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { handleApiError } from '../../../shared/utils/handleError';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forecast: ForecastDto;
  fiveDaysForecast: List[] = [];
  zipcode: number;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.zipcode = +params.get('zipcode');
      this.getForecastByZipcode(this.zipcode);
    });
  }

  /**
   * get all forecasts by zipcode consuming service
   * @param zipcode
   */
  private getForecastByZipcode(zipcode: number): void {
    this.forecastService
      .getForecastByZipcode(zipcode)
      .pipe(take(1))
      .subscribe({
        next: (forecast: ForecastDto) => {
          this.forecast = forecast;
          this.fiveDaysForecast = this.getFiveDaysForecast(forecast?.list);
        },
        error: (err: HttpErrorResponse) => {
          handleApiError(err);
        },
      });
  }

  /**
   * get five days forecast of all list of API result
   * @param list
   */
  getFiveDaysForecast(list: List[]): List[] {
    const result = [];
    const days = new Set();

    for (let i = 0; i < list.length; i++) {
      const obj = list[i];
      const date = new Date(obj.dt_txt);
      const day = date.getDate();

      if (!days.has(day)) {
        days.add(day);
        result.push(obj);
      }
      if (result.length === 5) {
        break;
      }
    }
    return result;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
