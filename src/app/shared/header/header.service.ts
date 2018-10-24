import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HeaderService {
 
    constructor(private http: HttpClient) { }

    logout(){
        return this.http.get(`user/logout`)
        .pipe( map( res => res ) );
    }
    
}