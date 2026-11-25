import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { Auth } from '../Services/auth';
import { inject } from '@angular/core';
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
   const authService = inject(Auth);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log('Request started:', req.url);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {
      console.log('HTTP Error:', error.status);
      console.log('Error Message:', error.message);

      return throwError(() => error);
    }),

    finalize(() => {
      console.log('Request finished:', req.url);
    })

  );
};
