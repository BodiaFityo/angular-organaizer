import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/services/auth.guard';


const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {
                path: '', redirectTo: '/', pathMatch: 'full'
            },
            {
                path: '', component: DashboardComponent, canActivate: [AuthGuard]
            },
            {
                path: 'create', component: CreateTaskComponent,
                children: [
                    {
                        path: '', loadChildren: () => import('./organaizer/organaizer-module')
                            .then(m => m.OrganaizerModule)
                    }
                ],
                canActivate: [AuthGuard],
            },
            {
                path: 'login', component: LoginComponent
            },
            {
                path: '**', redirectTo: '/'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
