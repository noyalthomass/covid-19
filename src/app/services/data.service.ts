import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Countries } from '../models';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  loginForm:any
  url = 'https://corona.lmao.ninja/v2/all';
  database = { username: 'fingent', password: 'fingent' };
  intialCountries:Countries[]=[]
  private countries= new BehaviorSubject(this.intialCountries);
  sharedCountries = this.countries.asObservable();
  

  constructor(private http: HttpClient,private fb:FormBuilder,) {}

  createForm(){
    return this.loginForm = this.fb.group({
      'username':['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
      'password':['',[Validators.required,Validators.pattern('[a-zA-Z0-9@#$!]*')]]
    })
  }

  nextCountries(countries: Countries[]) {
    this.countries.next(countries)
  }

  get(url: string, options?: any) {
    return this.http.get(url, options);
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token;
  }

  authenticate(creditials: any) {
    if (this.database.username == creditials.username) {
      if (this.database.password == creditials.password) {
        localStorage.setItem('token', creditials.username);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getCovidData() {
    return this.http.get<any>(this.url);
  }

  getCountriesData(){
    return this.http.get<Countries>('https://corona.lmao.ninja/v2/countries');
  }
}
