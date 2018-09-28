import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
 
    constructor(private http: HttpClient) { }

    getAllUser(page, size, sortby, sortorder, search){
        return this.http.get<any>('user/getAllUsers?page='+page+'&size='+size+'&sortby='+sortby+'&sortorder='+sortorder+'&search='+search)
            .pipe( map( res => res ) );
    }
    
}