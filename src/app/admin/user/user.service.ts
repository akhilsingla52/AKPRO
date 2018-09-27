import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
 
    constructor(private http: HttpClient) { }

    getAllUser(){
        return this.http.get<any>(`user/getAll`)
            .pipe( map( res => res ) );
    }
    
}