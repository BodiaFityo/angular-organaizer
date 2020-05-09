import {NgModule} from '@angular/core';
import {OrganaizerLayoutComponent} from './organaizer-layout/organaizer-layout.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {SharedModule} from '../shared/sharedModule';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/services/auth.guard';
import {SelectorPageComponent} from './selector-page/selector-page.component';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    {
        path: '', component: OrganaizerLayoutComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        OrganaizerLayoutComponent,
        CalendarPageComponent,
        SelectorPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        HttpClientModule,
    ],
    exports: [
        SharedModule,
        RouterModule,
        HttpClientModule,
    ],
    providers: []
})

export class OrganaizerModule {
}
