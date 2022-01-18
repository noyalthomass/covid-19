import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectLanguage:string=''
  loginForm = this.fb.group({
    'username':['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
    'password':['',[Validators.required,Validators.pattern('[a-zA-Z0-9@#$!]*')]]
  })
  constructor(private fb:FormBuilder, private service:DataService, private router:Router,public translate:TranslateService) { 
    translate.addLangs(['English','French','Arab']);
    translate.setDefaultLang('English');
    this.selectLanguage = localStorage.getItem("lang")||"English"
    translate.use(this.selectLanguage)
  }

  ngOnInit(): void {
  }

  changeLang(lang:any){
    localStorage.setItem("lang",lang)
    this.selectLanguage=localStorage.getItem("lang")||'English'
    this.translate.use(this.selectLanguage)
  }

  login(){
    if(this.loginForm.valid){
      let response = this.service.authenticate(this.loginForm.value);
      if(response){
        this.router.navigateByUrl('home')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect username / password',
          
        })
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter creditials...',
        
      })
    }
  }

}
