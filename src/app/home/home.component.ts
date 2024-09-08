import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NagerDateService } from '../services/nager-date.service';
import { NgArrayPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  randomCountries: any[] = [];
  searchTerm = "";

  constructor(private nagerDateService: NagerDateService) { }

  ngOnInit(): void {
    this.nagerDateService.getCountries().subscribe({
      next: (data: any) => {
        this.countries = data;
        this.getRandomCountries().then((randomCountries) => {
          this.randomCountries = randomCountries;
          console.log(this.randomCountries); // logs the array of random countries with holiday data
        });
      },
      error: (error) => console.log('Failed to fetch countries', error)
    });
  }

  private async getRandomCountries(): Promise<any[]> {
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
    for (const country of randomCountries) {
      try {
        const data = await lastValueFrom(this.nagerDateService.getNextHoliday(country.countryCode));
        if (data && data.length > 0) {
          const nextHoliday = data[0];
          country.nextHolidayName = nextHoliday.name;
          country.nextHolidayDate = nextHoliday.date;
        } else {
          console.warn(`No upcoming holidays found for ${country.name}`);
        }
      } catch (error) {
        console.error(`Error fetching holiday data for ${country.name}:`, error);
      }
    }

    return randomCountries;
  }
}