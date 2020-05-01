import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/Interfaces';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(
        private authService: AuthService,
        private router: Router,
        ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    onSubmit() {
        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password,
            returnSecureToken: true,
        };
        this.authService.login(user)
            .subscribe(observer => {
                this.form.reset();
                this.router.navigate(['']);
            });
    }
}
