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
