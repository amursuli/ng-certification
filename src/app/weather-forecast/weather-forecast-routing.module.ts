import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastComponent } from './weather-forecast.component';
import { ForecastComponent } from './components/forecast/forecast.component';

const routes: Routes = [
  { path: '', component: WeatherForecastComponent },
  { path: 'forecast/:zipcode', component: ForecastComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherForecastRoutingModule {}
