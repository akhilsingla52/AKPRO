import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginService {
 
    constructor(private http: HttpClient) { }

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