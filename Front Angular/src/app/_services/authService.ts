import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_dto'


@Injectable({providedIn:"root"})
export class AuthService{
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;
    

    constructor(private router:Router, private http:HttpClient){        
        this.userSubject = new BehaviorSubject<any>(JSON.parse(JSON.stringify(localStorage.getItem('user.data.token'))));
        this.user = this.userSubject.asObservable()
    }
    public get userValue(): User {
        return this.userSubject.value;
       
    } 
    login({email, password}: User){
        return this.http.post< User | any>(`${environment.apiUrl}/login`, {email, password},  {observe: 'response' as 'body'})
        .pipe(map((resp: HttpResponse< User | any >) => {
            localStorage.setItem('user.data.token', (resp.headers.get('authorization')));
            this.userSubject.next(resp.headers.get('authorization'));
             return this.user;
        }));
        

    }

    register({email, password}: User){
        return this.http.post<User>(`${environment.apiUrl}/register`, {email, password})
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/utilisateurs/`)
        .pipe(tap(user => (JSON.stringify(user))))
    }
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/utilisateurs/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
    logout() {
        
        // remove user from local storage and set current user to null
        localStorage.removeItem('user.data.token');
        this.userSubject.next(null);

        this.router.navigate(['/auth/login']);
    }
    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/utilisateurs/${id}`);
    }
    update(id: string, params: object) {
        return this.http.put(`${environment.apiUrl}/utilisateurs/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    // this.userSubject.next(user);
                }
                return x;
            }));
    }
}