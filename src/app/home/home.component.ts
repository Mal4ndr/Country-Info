import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NagerDateService } from '../services/nager-date.service';
import { NgArrayPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgArrayPipesModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  randomCountries: any[] = [];
  searchTerm = '';

  constructor(private nagerDateService: NagerDateService) { }

  ngOnInit(): void {
    this.nagerDateService.getCountries().subscribe({
      next: (data: any) => {
        this.countries = data;
        this.getRandomCountries().subscribe({
          next: (data: any) => this.randomCountries = data,
          error: (error) => console.log('Failed to fetch random countries for widget ')
        });
      },
      error: (error) => console.log('Failed to fetch countries ', error),
    });
  }

  private getRandomCountries(): Observable<any[]> {
    const randomCountries: any[] = [];
    const selectedIndices = new Set<number>();

    // getting 3 random unique countries
    while (randomCountries.length < 3) {
      const randomIndex = Math.floor(Math.random() * this.countries.length);

      if (!selectedIndices.has(randomIndex)) {
        selectedIndices.add(randomIndex);
        randomCountries.push(this.countries[randomIndex]);
      }
    }

    // fetching the next holiday data for each country
    return from(randomCountries).pipe(
      mergeMap((country) =>
        this.nagerDateService.getNextHoliday(country.countryCode).pipe(
          map((data) => {
            if (data && data.length > 0) {
              const nextHoliday = data[0];
              country.nextHolidayName = nextHoliday.name;
              country.nextHolidayDate = nextHoliday.date;
            } else {
              console.warn(`No upcoming holidays found for ${country.name}`);
            }
            return country;
          })
        )
      ),
      toArray()
    );
  }
}