import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FireBaseAuthResponse, User} from '../Interfaces';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable()

export class AuthService {
    public errorStream$: Subject<string> = new Subject<string>();

    private setToken(response: FireBaseAuthResponse | null) {

        if (response) {
            const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-exp-token', expDate.toString());
        } else {
            localStorage.clear();
        }
    }

    get token() {
        const expToken = new Date(localStorage.getItem('fb-exp-token'));
        if (new Date() > expToken) {
            this.logOut();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    login(user: User): Observable<FireBaseAuthResponse | User> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    logOut() {
        this.setToken(null);
    }

    isAuthenticated() {
        return !!this.token;
    }

    handleError(error) {
        const message = error.error.error.message;
        this.errorStream$.next(message);
    }
}
