import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class TestService {
 
    constructor(private http: HttpClient) { }

    getAllExamDetails(){
        return this.http.get<any>(`exam/getAll`)
            .pipe( map( res => res ) );
    }
    
}