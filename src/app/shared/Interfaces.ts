import * as moment from 'moment';

export interface User {
    id?: number;
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface FireBaseAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Day {
    value: moment.Moment;
    active: boolean;
    disabled: boolean;
    selected: boolean;
}

export interface Week {
    days: Day[];
}

export interface Task {
    id?: string;
    title: string;
    text: string;
    date?: string;
}

export interface CreateResponse {
    name: string;
}

export interface CreationDate {
    time: string;
}
