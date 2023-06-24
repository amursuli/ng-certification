import { Component, HostListener, Input, OnInit } from '@angular/core';
import { WeatherService } from '../core/services/weather/weather.service';
import { WeatherDto, WeatherDetail } from '../core/models/weather-dto';
import { take } from 'rxjs/operators';
import { LocalStorageService } from '../core/services/localStorage/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { handleApiError } from '../shared/utils/handleError';

@Component({
  selector: 'app-home',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  zipcodes: number[] = [];
  weatherDetail: WeatherDetail[] = [];
  zipcodeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private localStorageService: LocalStorageService
  ) {
    this.zipcodeForm = this.formBuilder.group({
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  ngOnInit(): void {
    if (this.localStorageService.getZipcodes().length > 0) {
      this.localStorageService.getZipcodes().forEach((zip: number) => {
        this.getWeatherByZipcode(zip);
      });
    }
  }

  private getWeatherByZipcode(zipcode: number): void {
    this.weatherService
      .getWeatherByZipcode(zipcode)
      .pipe(take(1))
      .subscribe({
        next: (weather: WeatherDto) => {
          this.createWeatherDetail(weather, zipcode);
        },
        error: (err: HttpErrorResponse) => {
          handleApiError(err);
        },
      });
  }

  createWeatherDetail(weather: WeatherDto, zipcode: number): void {
    const newWeatherLocation: WeatherDetail = {
      zipcode: zipcode,
      place: weather.name,
      condition: weather.weather[0]?.main,
      currentTemperature: weather.main?.temp,
      maxTemperature: weather.main?.temp_max,
      minTemperature: weather.main?.temp_min,
    };
    this.weatherDetail.push(newWeatherLocation);
  }

  addLocationByZipcode(): void {
    const zipcode = this.zipcodeForm.get('zipcode').value;
    if (this.localStorageService.addZipcode(parseInt(zipcode))) {
      this.getWeatherByZipcode(parseInt(zipcode));
    }
    this.zipcodeForm.get('zipcode').reset();
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    localStorage.clear();
  }

  @Input()
  removeLocation(zipcode: number, index: number): void {
    this.localStorageService.removeZipcode(zipcode);
    this.weatherDetail.splice(index, 1);
  }
}
