import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from './pipes/temperature/temperature.pipe';
import { ImagesWeatherPipe } from './pipes/images-weather/images-weather.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TemperaturePipe, ImagesWeatherPipe],
  imports: [CommonModule, RouterModule],
  exports: [TemperaturePipe, ImagesWeatherPipe],
})
export class SharedModule {}
