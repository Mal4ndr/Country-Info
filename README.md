# Country-Info
Angular engineer test assessment - Country Info

# Overview
This application provides detailed information about countries, focusing on their upcoming holidays. It consists of two main pages:

1. Home Page:
* Displays a widget featuring data on three randomly selected countries, including the name and date of their next holiday.
* Lists all countries available from the Nager.Date API (api logic located in nager-date.service.ts). You can search for a specific country using the search field. Clicking on a country name navigates you to its detailed information.

2. Country Page:
* Shows all public holidays for the selected country, defaulting to the current year.
* Includes a set of buttons to change the displayed year within a range from 2020 to 2030.

# Features
* Display 3 random countries and data about their next holiday inside widget
* Display list of countries
* Search countries by name
* Display public holidays of chosen country
* Display buttons group to change year, current year is a defult

# Prerequisites
* Before you begin, ensure you have met the following requirements:
- Node.js: 20.16.0
- Angular: 18.2.3
- npm: 9.6.7
- Git

# Installation
1. Clone the Repository
git clone https://github.com/Mal4ndr/Country-Info.git
2. Navigate to the Project Directory in your IDE, code editor
3. Install Dependencies
'npm install'

# Running the Application
1. Start the development server using: 'ng serve'
2. Open your web browser  and navigate to: http://localhost:4200/

# Used libraries and toolkits
* Bootstrap v5.3
* RxJS
