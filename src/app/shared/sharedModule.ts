import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {DateService} from './services/date.service';
import {MomentPipe} from './moment.pipe';
import {CreateTaskModalComponent} from '../organaizer/create-task-modal/create-task-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthInterceptor} from './auth.interceptor';
import {TasksService} from './services/tasks.service';

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
};

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        MomentPipe,
        CreateTaskModalComponent
    ],
    exports: [
        HttpClientModule,
        MomentPipe,
        CreateTaskModalComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthGuard,
        AuthService,
        DateService,
        TasksService,
        INTERCEPTOR_PROVIDER
    ]
})
export class SharedModule {
}
