import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorageKey = 'zipcodes';

  getZipcodes(): number[] {
    const zipcodes = localStorage.getItem(this.localStorageKey);
    if (zipcodes) {
      return JSON.parse(zipcodes);
    }
    return [];
  }

  addZipcode(zipcode: number): boolean {
    const zipcodes = this.getZipcodes();
    if (!zipcodes.includes(zipcode)) {
      zipcodes.push(zipcode);
      localStorage.setItem(this.localStorageKey, JSON.stringify(zipcodes));
      return true;
    } else {
      return false;
    }
  }

  removeZipcode(zipcode: number): void {
    const zipcodes = this.getZipcodes();
    const index = zipcodes.indexOf(zipcode);
    if (index !== -1) {
      zipcodes.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(zipcodes));
    }
  }
}
