import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Countries } from '../models/index'
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PageEvent} from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

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
  pageSize: number = 30;
  length: number = 30;
  fooService: any;
  isLoading = true;
  selectLanguage:string=''

  constructor(private ds: DataService, private router: Router,public translate:TranslateService,private spinner: NgxSpinnerService) {
    translate.addLangs(['English','French','Arab']);
    translate.setDefaultLang('English');
    this.selectLanguage = localStorage.getItem("lang")||"English"
    translate.use(this.selectLanguage)
  }
  changeLang(lang:any){
    localStorage.setItem("lang",lang)
    this.selectLanguage=localStorage.getItem("lang")||'English'
    this.translate.use(this.selectLanguage)
  }

  ngOnInit(): void {
    if(this.countries){
      this.spinner.show()
      setTimeout(()=>{
        this.spinner.hide()
      },700)
    }
    
    this.ds.sharedCountries.subscribe((countries) => {
      this.countries = countries;
      this.filteredCountries = this.countries.slice(0, this.pageSize);
      this.length = this.countries.length;
    });
    this.ds.nextCountries(this.filteredCountries);
    if (!this.filteredCountries.length) {
      
      this.ds.get('https://corona.lmao.ninja/v2/countries').subscribe(
        (result: any) => {
          this.isLoading = false;
          if (result) {
            const updatedCountries: Countries[] = [];
            result.forEach((country: any) => {
              updatedCountries.push({
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
            this.ds.nextCountries(updatedCountries); 
          }
          
        },
        (result: any) => {
          if (result.error) {
            console.error(result.error);
            this.isLoading = false;
          }
        }
      );
      
    }
    
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
    const currentIndex = event.pageIndex * event.pageSize;
    const nextIndex = currentIndex + event.pageSize;
    this.filteredCountries = this.countries.slice(currentIndex, nextIndex);

    return event;
  }

  onOptionsSelected(value: string) {
    switch (value) {
      case 'name':
        this.filteredCountries.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'cases':
        this.filteredCountries.sort((a, b) => a.cases - b.cases);
        break;
      case 'deaths':
        this.filteredCountries.sort((a, b) => a.deaths - b.deaths);
        break;
      case 'recovered':
        this.filteredCountries.sort((a, b) => a.recovered - b.recovered);
        break;
      default:
    }
  }
}
