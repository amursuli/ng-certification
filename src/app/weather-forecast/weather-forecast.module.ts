import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastComponent } from './weather-forecast.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherForecastComponent, ForecastComponent, WeatherComponent],
  imports: [CommonModule, WeatherForecastRoutingModule, SharedModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class WeatherForecastModule {}
