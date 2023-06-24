import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit: 'F' | 'C'): number {
    if (value === undefined || isNaN(value)) {
      return NaN;
    }

    if (unit === 'F') {
      return Math.round(((value - 273.15) * 9) / 5 + 32);
    } else if (unit === 'C') {
      return Math.round(value - 273.15);
    } else {
      return NaN;
    }
  }
}
