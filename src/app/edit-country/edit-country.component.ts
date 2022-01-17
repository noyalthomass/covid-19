import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Countries } from './edit-country.model';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

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
  editForm: FormGroup;
  countries: Countries[] = [];
  country:Countries={
    title:'',
    cases:0,
    deaths:0,
    recovered:0,
    tests:0,
  }
  id:string | null=""
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router,private ds: DataService,private activatedRoute:ActivatedRoute ) {
    this.editForm = new FormGroup({
      editFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
    });
  }

  ngOnInit(): void {

this.id=this.activatedRoute.snapshot.paramMap.get('id')

   this.getData()
  }


  getData(): void {
    this.ds.get('https://corona.lmao.ninja/v2/countries').subscribe(
      (result: any) => {
        if (result) {
          result.forEach((country: any) => {
            this.countries.push({
              title: country.country,
              cases: country.cases,
              deaths: country.deaths,
              recovered: country.recovered,
              tests: country.tests,

            });

            if(country.updated==this.id){

              this.country.title=country.country,
              this.country.cases=country.cases,
              this.country.deaths=country.deaths,
              this.country.recovered=country.recovered,
              this.country.tests=country.tests
            }
           
          });
          console.log(this.country)
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
    this.editForm.reset();
    this.router.navigateByUrl('/countries');
  }
}
