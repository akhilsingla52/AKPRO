import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserDetails } from 'src/app/shared/models/UserDetails';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
 
    constructor(private http: HttpClient) { }

    login(user: UserDetails): Observable<any>{
        return this.http.post(`user/admin/signin`, user)
        .pipe( map( res => res ) );
    }
    
}