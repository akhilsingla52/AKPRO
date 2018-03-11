import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpInterceptor } from '../../shared/httpInterceptor/httpInterceptor';


@Injectable()
export class LoginService {
 
    constructor(private http: HttpInterceptor) { }

    // getAllUserQuiz(){
    //     return this.http.get(`api/getAllUserQuiz`)
    //     .toPromise()
    //     .then(Response =>Response.json().result )
    //     .catch(this.handleError)
    // }

    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
    
}