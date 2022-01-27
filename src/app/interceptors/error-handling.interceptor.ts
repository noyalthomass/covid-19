import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable ,catchError,throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  handleError(error:HttpErrorResponse){
    if(error.status===404){
      this.router.navigateByUrl("404")
    }else if(error.status===500){
      this.router.navigateByUrl("500")
    }
    return throwError(()=>error)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      catchError((error)=>this.handleError(error)))
    
  }
}
