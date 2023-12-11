import { catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { AuthServiceService } from '../services/auth-service.service';
@Injectable({
    providedIn: 'root'
})

export class HttpRequestHandler implements HttpInterceptor {
    constructor(protected authService: AuthServiceService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isFormData = request.body instanceof FormData;
        let token: any = localStorage.getItem('token');
        let headers: any = {
            'Authorization': (token && token != 'undefined') ? JSON.parse(token) : '',
            'Cache-control': 'no-cache',
            'Expires': '0',
            'Pragma': 'no-cache'
        };
        if (isFormData) headers['Accept'] = 'application/json';
        else headers['Content-Type'] = 'application/json';
        let nextRequest = request.clone({ setHeaders: headers });
        return next.handle(nextRequest)
            .pipe(catchError((error: HttpErrorResponse) => {
                if (error.status == 401 || error.error == 'tokenError') {
                    this.authService.localLogOut();
                    return throwError('Access Denied.');
                } else {
                    return throwError(error);
                }
            }));
    }
}
