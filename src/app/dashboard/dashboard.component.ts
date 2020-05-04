import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {TasksService} from '../shared/services/tasks.service';
import {CreationDate} from '../shared/Interfaces';
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    creationDate: CreationDate[] = [];

    constructor(
        private auth: AuthService,
        private taskService: TasksService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.taskService.getTasks()
            .subscribe(time => {
                this.creationDate = time;
            });
    }

    logOut() {
        this.auth.logOut();
        this.router.navigate(['', 'login']);
    }
}
