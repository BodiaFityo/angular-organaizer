import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FireBaseAuthResponse, User} from '../Interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()

export class AuthService {

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
                tap(this.setToken)
            );
    }

    logOut() {
        this.setToken(null);
    }

    isAuthenticated() {
        return !!this.token;
    }
}
