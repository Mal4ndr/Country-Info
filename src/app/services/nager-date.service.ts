import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NagerDateService {
  private baseURL = 'https://date.nager.at/api/v3';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseURL}/AvailableCountries`);
  }

  getNextHoliday(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseURL}/NextPublicHolidays/${countryCode}`);
  }

  getHolidaysList(year: number, countryCode: string) {
    return this.http.get(`${this.baseURL}/PublicHolidays/${year}/${countryCode}`);
  }

  getCountryInfo(countryCode: string) {
    return this.http.get(`${this.baseURL}/CountryInfo/${countryCode}`);
  }
}
