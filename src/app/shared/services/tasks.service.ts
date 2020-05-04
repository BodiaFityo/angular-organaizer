import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateResponse, Task} from '../Interfaces';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable()

export class TasksService {
    static url = 'https://angular-organaizer-92689.firebaseio.com/tasks';

    constructor(private http: HttpClient) {
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
            .pipe(
                map(res => {
                    return {
                        ...task,
                        id: res.name
                    };
                })
            );
    }

    getTasks(): Observable<any> {
        return this.http.get<any>(`${TasksService.url}/.json`)
            .pipe(
                map(tasks => {
                    if (!tasks) {
                        return [];
                    }
                    return Object.keys(tasks)
                        .map(key => {
                            return {
                                time: key
                            };
                        });
                })
            );
    }

    getTask(date: moment.Moment): Observable<Task[]> {
        return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(
                map(tasks => {
                    if (!tasks) {
                        return [];
                    }
                    return Object.keys(tasks)
                        .map(key => {
                            return {
                                ...tasks[key],
                                id: key
                            };
                        });
                })
            );
    }

    deleteTask(task: Task): Observable<any> {
        return this.http.delete<any>(`${TasksService.url}/${task.date}/${task.id}.json`);
    }
}
