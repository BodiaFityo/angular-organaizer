import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Task } from 'src/app/shared/Interfaces';
import {DateService} from '../../shared/services/date.service';
import {TasksService} from "../../shared/services/tasks.service";

@Component({
    selector: 'app-create-task-modal',
    templateUrl: './create-task-modal.component.html',
    styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {
    @Output() hideModal: EventEmitter<boolean> = new EventEmitter<boolean>();
    form: FormGroup;
    date;

    constructor(
        private dateService: DateService,
        private tasksService: TasksService
    ) {
    }

    ngOnInit(): void {
        this.date = this.dateService.date;
        this.form = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            text: new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        const {title} = this.form.value;
        const {text} = this.form.value;
        const task: Task = {
            title,
            text,
            date: this.date.value.format('DD-MM-YYYY')
        };
        this.tasksService.createTask(task)
            .subscribe((observable) => {
                this.form.reset();
                this.onClose();
            },
                error => console.error(error));
    }

    onClose() {
        this.hideModal.emit(false);
    }
}
