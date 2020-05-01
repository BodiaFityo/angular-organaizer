import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class SharedModule {
}
