import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {
                path: '', redirectTo: '/', pathMatch: 'full'
            },
            {
                path: '', component: DashboardComponent
            },
            {
                path: 'create', component: CreateTaskComponent
            },
            {
                path: 'login', component: LoginComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
