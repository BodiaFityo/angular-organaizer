import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { CreateTaskComponent } from './create-task/create-task.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
