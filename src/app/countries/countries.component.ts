import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Countries } from './countries.model';
import { Router } from '@angular/router';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: Countries[] = [];
  searchText: string = '';
  filteredCountries: Countries[] = [];
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 10;
  fooService: any;
  isLoading=true;

  constructor(private ds: DataService, private router: Router) {

  }

  ngOnInit(): void {
    this.ds.get('https://corona.lmao.ninja/v2/countries').subscribe(
      (result: any) => {
        this.isLoading=false;

        if (result) {
          result.forEach((country: any) => {
            this.countries.push({
              flag: country.countryInfo.flag,
              title: country.country,
              cases: country.cases,
              deaths: country.deaths,
              recovered: country.recovered,
              tests: country.tests,
              population: country.population,
              updated: country.updated,
            });
          });
          this.filteredCountries = this.countries.slice(0,this.length);
          this.length=this.countries.length
        }
      },
      (result: any) => {
        if (result.error) {
          console.error(result.error);
          this.isLoading=false;
        }
      }
    );
  }

  onChangeEvent(event: any) {
    const searchValue = event.target.value.toLowerCase();

    this.filteredCountries = this.countries.filter((country) => {
      return country.title.toLowerCase().includes(searchValue);
    });
  }
  
  btnClick = () => {
    this.router.navigateByUrl('/edit-country');
  };

  OnPageChange(event: PageEvent) {
    const currentIndex=event.pageIndex*event.pageSize
    const nextIndex=currentIndex+event.pageSize
    this.filteredCountries=this.countries.slice(currentIndex,nextIndex)

    return event;
  }
}
