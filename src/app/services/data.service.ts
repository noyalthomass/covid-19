import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://corona.lmao.ninja/v2/all'

  database = {username:"fingent",password:"fingent"}

  constructor(private http:HttpClient) { }

  isLoggedIn(){
    const token = localStorage.getItem("token")
    return token;
  }

  authenticate(creditials:any){
    if(this.database.username==creditials.username){
      if(this.database.password==creditials.password){
        localStorage.setItem("token",creditials.username)
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

  getCovidData(){
    return this.http.get<any>(this.url)
  }
}
