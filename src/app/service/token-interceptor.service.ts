import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MzYxMzFmNDUzOWQ4ZDYxZjYyYzNlNWIiLCJpc3MiOiJNeUFwcCIsImV4cCI6MTY3MDI4OTg3MywiaWF0IjoxNjcwMjUzODczfQ.9cfHT-M0V4N-aYD4cLEhQiCYOqF8CcGkU-IJBm_f98oAdK0HeHu6dbvx2zgZSHrb_eiZAJOw3qVkq96O-QcgZw';
    let jwttoken = req.clone({
      setHeaders:{
        Authorization:'bearer ' + token
      }
    })
    return next.handle(jwttoken);
  }


}
