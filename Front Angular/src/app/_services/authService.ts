import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_dto'


@Injectable({providedIn:"root"})
export class AuthService{
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private router:Router, private http:HttpClient){        
        this.userSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(localStorage.getItem('user.data.token'))));
        this.user = this.userSubject.asObservable()
    }
    login(email, password){
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, {email, password})
            .pipe(map(user=>{
                localStorage.setItem('user.data.token', user.email)
                this.userSubject.next(user)
                return user
            }))

    }

    register({email, password}: User){
        return this.http.post<User>(`${environment.apiUrl}/auth/register`, {email, password})
    }
}