import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagesWeather',
})
export class ImagesWeatherPipe implements PipeTransform {
  transform(type: string): string {
    let url: string;
    switch (type) {
      case 'Rain':
        url = 'https://www.angulartraining.com/images/weather/rain.png';
        break;
      case 'Clear':
        url = 'https://www.angulartraining.com/images/weather/sun.png';
        break;
      case 'Clouds':
        url = 'https://www.angulartraining.com/images/weather/clouds.png';
        break;
      case 'Haze':
        url = 'https://www.angulartraining.com/images/weather/clouds.png';
        break;
      case 'Mist':
        url = 'https://www.angulartraining.com/images/weather/clouds.png';
        break;
      case 'Snow':
        url = 'https://www.angulartraining.com/images/weather/snow.png';
        break;
      default:
        url = '';
        break;
    }
    return url;
  }
}
