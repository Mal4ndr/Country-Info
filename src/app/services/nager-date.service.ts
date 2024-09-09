import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NagerDateService {
  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseURL}/AvailableCountries`);
  }

  getNextHoliday(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseURL}/NextPublicHolidays/${countryCode}`);
  }

  getHolidaysList(year: number, countryCode: string): Observable<any> {
    return this.http.get(`${this.baseURL}/PublicHolidays/${year}/${countryCode}`);
  }

  getCountryInfo(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseURL}/CountryInfo/${countryCode}`);
  }
}
