import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
            {
                email, password, returnSecureToken: true
            }
        ).pipe(
            map((data: any) => {
                return {
                    email: data.email,
                    idToken: data.idToken,
                    refreshToken: data.refreshToken,
                    expiresIn: data.expiresIn,
                    localId: data.localId,
                    registered: data.registered
                } as AuthResponseData
            })
        );
    }


    formatUser(data: AuthResponseData): User {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const user = new User(data.email, data.idToken, data.localId, expirationDate);
        return user;
    }
}