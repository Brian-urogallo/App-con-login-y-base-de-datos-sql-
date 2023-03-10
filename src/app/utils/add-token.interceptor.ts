import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';


@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private _errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): 
  Observable<HttpEvent<unknown>> {
    //const token =  localStorage.getItem('token');
    const token = localStorage.getItem('token')
   
    if(token){
      request = request.clone({setHeaders: {authorization: `Bearer ${token.slice(10,145)}`}})
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>{
        if (error.status === 401){
          this._errorService.msggError(error)
          this.router.navigate(['/login'])
        }
        return throwError(() => Error('Error'))
      })
    )
  }
}
