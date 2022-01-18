import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Countries } from '../models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss'],
})
export class EditCountryComponent implements OnInit {
  selectLanguage:string=''
  countries: Countries[] = [];
  country: Countries 
  id: number 
  matcher = new MyErrorStateMatcher();
  
  editForm = this.formBuilder.group({
    'cases':['',[Validators.required,Validators.pattern('[0-9]*')]],
    'deaths':['',[Validators.required,Validators.pattern('[0-9]*')]],
    'recovered':['',[Validators.required,Validators.pattern('[0-9]*')]],
    'tests':['',[Validators.required,Validators.pattern('[0-9]*')]],
  })

  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ds: DataService,
    private activatedRoute: ActivatedRoute,
    public translate:TranslateService
  ) {
    
    this.selectLanguage = localStorage.getItem("lang")||"English"
    translate.use(this.selectLanguage)
  }

  ngOnInit(): void {
    const countryId=this.activatedRoute.snapshot.paramMap.get('id');
    if(countryId){
      this.id=Number(countryId)
    }
    this.ds.sharedCountries.subscribe((countries) => {
      if(!countries.length){
        this.getData()
      }
     else{
      this.countries = countries;
      const selectedCountry=countries.find(f=>f.updated===this.id)
      if(selectedCountry){
        this.country=selectedCountry
      }
     }
    });
  }

  getData(): void {
    this.ds.get('https://corona.lmao.ninja/v2/countries').subscribe(
      (result: any) => {
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
        }
      }
    );
  }
  resetForm() {
    
    this.router.navigateByUrl('/countries');
  }

  onClickSubmit(value:any){
   if(this.editForm.valid){
    const updatedCountryIndex=this.countries.findIndex(f=>f.updated=this.id)
    console.log(updatedCountryIndex)
    if(updatedCountryIndex>=0){
      this.countries[updatedCountryIndex]={
        ...this.countries[updatedCountryIndex],
        cases:value.cases,
        deaths:value.deaths,
        recovered:value.recovered,
        tests:value.tests
      }
      this.ds.nextCountries(this.countries)
      this.router.navigateByUrl('/countries');
    }
   }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter valid information. ',
      
    })
   }
    
  }
}
