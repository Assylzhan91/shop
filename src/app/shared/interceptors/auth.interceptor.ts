import {catchError, Observable, throwError} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import {AUTH_SERVICE} from "@tokens";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AUTH_SERVICE)
  private router = inject(Router)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.authService.isAuthenticated()) {
      request =  request.clone({
        setHeaders: {
          Authorization: this.authService.getToken || ''
        }
      })
    }
    return next.handle(request)
      .pipe(
        catchError(({error}) => {
          console.log('error', error)
          if(error.status === 401) {
            this.authService.logout()
            this.router.navigate(['/admin', 'login'])
          }
          return throwError(error)
        })
    )
  }
}
