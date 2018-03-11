import { Injectable } from '@angular/core';
import {
    Http, ConnectionBackend, RequestOptions,
    RequestOptionsArgs, Response, Headers, Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

/**
 * For get request
 */
 get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(this.getFullUrl(url), this.requestOptions(options))
    .catch((error: any, caught: Observable<any>) => {
        console.log('error in interceptor');
        return Observable.throw(error);
    }).do((res: Response) => {
        console.log('success interceptor');
    }, (error: any) => {
        console.log('error in interceptor');
    })
 }

/**
 * For post request
 */
 post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return super.post(this.getFullUrl(url), body,this.requestOptions(options))
    .catch((error: any, caught: Observable<any>) => {
        console.log('error in interceptor');
        return Observable.throw(error);
    }).do((res: Response) => {
        console.log('success interceptor');
    }, (error: any) => {
        console.log('error in interceptor');
    })
 }

/**
 * For put request
 */
 put(url: string, body:any, options?: RequestOptionsArgs): Observable<any> {
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
    .catch((error: any, caught: Observable<any>) => {
        console.log('error in interceptor');
        return Observable.throw(error);
    }).do((res: Response) => {
        console.log('success interceptor');
    }, (error: any) => {
        console.log('error in interceptor');
    })
 }

 /**
 * For delete request
 */
 delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
    .catch((error: any, caught: Observable<any>) => {
        console.log('error in interceptor');
        return Observable.throw(error);
    })
 }

 getFullUrl(url: string) {
     //return 'http://localhost:3000' + url;
     return url;
 }

 requestOptions(options: RequestOptionsArgs) {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
        if(localStorage.getItem("admin")=="administrator") {
            options.headers = new Headers({
                'userrole': JSON.parse(localStorage.getItem('userProfile')).role,
                'flag': 1
            });
        } else {
            options.headers = new Headers({
                'userrole': JSON.parse(localStorage.getItem('userProfile')).role,
                'flag': 0
            });
        }    
    }

    return options;
 }

}