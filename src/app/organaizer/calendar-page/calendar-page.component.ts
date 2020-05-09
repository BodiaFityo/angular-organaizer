import {Component, OnInit} from '@angular/core';
import {Week, Task} from '../../shared/Interfaces';
import {DateService} from '../../shared/services/date.service';
import * as moment from 'moment';
import {TasksService} from '../../shared/services/tasks.service';
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-calendar-page',
    templateUrl: './calendar-page.component.html',
    styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {
    calendar: Week[];
    showModal = false;
    date;
    existedTask: Task[] = [];

    constructor(
        private dateService: DateService,
        private taskService: TasksService
) {
    }

    ngOnInit(): void {
        this.date = this.dateService.date;
        this.dateService.date
            .pipe(
                switchMap(value => this.taskService.getTask(value))
            )
            .subscribe(res => {
                this.existedTask = res;
            });
        this.dateService.date
            .subscribe(this.generate.bind(this));
    }

    generate(dateNow: moment.Moment) {
        const startDay = dateNow.clone().startOf('month').startOf('week');
        const endDay = dateNow.clone().endOf('month').endOf('week');
        const date = startDay.clone().subtract(1, 'day');
        const calendar = [];

        while (date.isBefore(endDay, 'day')) {
            calendar.push({
                days: Array(7)
                    .fill(0)
                    .map(() => {
                        const value = date.add(1, 'day').clone();
                        const active = moment().isSame(value, 'date');
                        const disabled = !dateNow.isSame(value, 'month');
                        const selected = dateNow.isSame(value, 'date');
                        return {
                            value,
                            active,
                            disabled,
                            selected
                        };
                    })
            });
        }
        this.calendar = calendar;
    }

    select(day: moment.Moment) {
        this.dateService.changeDate(day);
    }

    onCreate() {
        this.showModal = true;
    }

    onDelete(task: Task) {
        this.taskService.deleteTask(task)
            .subscribe(() => {
                this.existedTask = this.existedTask.filter(t => t.id !== task.id);
            }, error => console.error(error));
    }
}
