import { Component, OnInit } from '@angular/core';
import { NagerDateService } from '../services/nager-date.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  countryCode!: string;
  holidays: any[] = [];
  country: any = {};
  years: number[] = [];

  constructor(private nagerDateService: NagerDateService, private route: ActivatedRoute) {
    // get country code from route params
    this.countryCode = this.route.snapshot.params['countryCode'];
  }

  ngOnInit(): void {
    // setting range of years
    this.years = Array.from({ length: 11 }, (_, i: number) => i + 2020);

    // getting chosen country info by it's code
    this.nagerDateService.getCountryInfo(this.countryCode).subscribe({
      next: (data: any) => this.country = data,
      error: (error) => console.log('Failed to fetch countries', error)
    });

    this.fetchHolidays(this.selectedYear);
  }

  // fetching chosen country list of holidays
  fetchHolidays(year: number): void {
    this.nagerDateService.getHolidaysList(this.selectedYear, this.countryCode).subscribe({
      next: (data: any) => this.holidays = data,
      error: (error) => console.log('Failed to fetch countries', error)
    });
  }

  // on click change year
  onYearSelected(year: number): void {
    this.selectedYear = year;
    this.fetchHolidays(year);
  }

  switchToNextYear(): void {
    if (this.selectedYear < this.years[this.years.length - 1]) {
      this.selectedYear++;
      this.fetchHolidays(this.selectedYear);
    }
  }

  switchToPreviousYear(): void {
    if (this.selectedYear > this.years[0]) {
      this.selectedYear--;
      this.fetchHolidays(this.selectedYear);
    }
  }
}
