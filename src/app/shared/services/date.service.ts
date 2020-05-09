import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class DateService {
    public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

    changeMonth(sDate: number): void {
        const value = this.date.value.add(sDate, 'month');
        this.date.next(value);
    }

    changeDate(date: moment.Moment) {
        const value = this.date.value.set({
            date: date.date(),
            month: date.month()
        });
        this.date.next(value);
    }
}
