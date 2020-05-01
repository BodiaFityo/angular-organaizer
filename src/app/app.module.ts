import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavComponent} from './shared/components/nav/nav.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/sharedModule';
import { OrganaizerLayoutComponent } from './organaizer/organaizer-layout/organaizer-layout.component';
import { CalendarPageComponent } from './organaizer/calendar-page/calendar-page.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainLayoutComponent,
        DashboardComponent,
        NavComponent,
        CreateTaskComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
