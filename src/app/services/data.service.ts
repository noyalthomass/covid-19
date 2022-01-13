import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  database = {username:"fingent",password:"fingent"}

  constructor() { }

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
}
