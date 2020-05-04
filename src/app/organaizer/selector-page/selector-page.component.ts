import {Component, OnInit} from '@angular/core';
import {DateService} from '../../shared/services/date.service';

@Component({
    selector: 'app-selector-page',
    templateUrl: './selector-page.component.html',
    styleUrls: ['./selector-page.component.scss']
})
export class SelectorPageComponent implements OnInit {
    date;
    constructor(private dateService: DateService) {
    }

    ngOnInit(): void {
        this.date = this.dateService.date;
    }

    switchDate(sDate: number) {
        this.dateService.changeMonth(sDate);
    }
}
