import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class TestService {
 
    constructor(private http: HttpClient) { }

    getAllExamDetails(page, size, sortby, sortorder, search){
        return this.http.get<any>('exam/getAllExamDetails?page='+page+'&size='+size+'&sortby='+sortby+'&sortorder='+sortorder+'&search='+search)
            .pipe( map( res => res ) );
    }
    
}