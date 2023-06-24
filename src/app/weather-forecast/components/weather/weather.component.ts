import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherDetail } from '../../../core/models/weather-dto';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  @Input()
  weatherDetail: WeatherDetail;

  @Output()
  removeLocation = new EventEmitter<number>();

  closeWeather(zipcode: number): void {
    this.removeLocation.emit(zipcode);
  }
}
