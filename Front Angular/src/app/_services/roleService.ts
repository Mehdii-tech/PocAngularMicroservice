import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Role } from "@app/_dto";

@Injectable({ providedIn: 'root' })
export class ClasseService {
    public role: Observable<Role>;
    constructor(private router: Router,
                private http: HttpClient)
    {}
    getAll() {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles/`)
        .pipe(tap(role => (JSON.stringify(role))))
    }
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/roles/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                // if (id == this.userValue.id) {
                //     this.logout();
                // }
                return x;
            }));
    }
    getById(id: string) {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles/${id}`)
        .pipe(tap(role => (JSON.stringify(role))));
    }

    update(id: string, params: object) {
        return this.http.put(`${environment.apiUrl}/roles/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                // if (id == this.userValue.id) {
                //     // update local storage
                //     const user = { ...this.userValue, ...params };
                //     localStorage.setItem('user', JSON.stringify(user));

                //     // publish updated user to subscribers
                //     // this.userSubject.next(user);
                // }
                return x;
            }));
    }
    add(role: Role){
        return this.http.post(`${environment.apiUrl}/roles/`, role);
    }
}