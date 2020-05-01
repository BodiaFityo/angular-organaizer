import {NgModule} from '@angular/core';
import {OrganaizerLayoutComponent} from './organaizer-layout/organaizer-layout.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {SharedModule} from '../shared/sharedModule';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
    {
        path: '', component: OrganaizerLayoutComponent, children: [
            {
                path: '', component: CalendarPageComponent
            }
        ],
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        OrganaizerLayoutComponent,
        CalendarPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        SharedModule,
        RouterModule
    ]
})

export class OrganaizerModule {
}
