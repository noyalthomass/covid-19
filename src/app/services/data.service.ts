import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Countries } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'https://corona.lmao.ninja/v2/all';
  database = { username: 'fingent', password: 'fingent' };
  intialCountries:Countries[]=[]
  private countries= new BehaviorSubject(this.intialCountries);
  sharedCountries = this.countries.asObservable();

  constructor(private http: HttpClient) {}

  nextCountries(countries: Countries[]) {
    this.countries.next(countries)
  }

  public get(url: string, options?: any) {
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
}
