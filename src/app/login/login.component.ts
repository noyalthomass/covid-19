import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    'username':['',[Validators.required,Validators.pattern('[a-zA-z]*')]],
    'password':['',[Validators.required,Validators.pattern('[a-zA-Z0-9@#$!]*')]]
  })
  constructor(private fb:FormBuilder, private service:DataService, private router:Router) { }

  ngOnInit(): void {
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
          text: 'Invalid username / password',
          
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
