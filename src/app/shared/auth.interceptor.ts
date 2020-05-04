import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this.authService.token
                }
            });
        }
        return next.handle(req)
            .pipe(
                tap(() => {
                    console.log('Intercept');
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log('INTERCEPTOR ERROR');
                    if (error.status === 401) {
                        this.authService.logOut();
                        this.router.navigate(['/admin', 'login']);
                    }
                    return throwError(error);
                })
            );
    }

}
