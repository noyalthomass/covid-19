import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly injector:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("token",request);
    let authService = this.injector.get(DataService)
    let req = request.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`,
        
      },
    })

    return next.handle(req);
  }
}
