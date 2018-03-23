import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, 
            HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { APP_URL } from '../utils/Const';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({ 
            headers: req.headers.set("Authorization", "auth-token"),
            url: (APP_URL + req.url)
        });

        return next
            .handle(authReq)
            .do(
                (succ: HttpEvent<any>) => {
                    if(succ instanceof HttpResponse) {
                        
                    }
                },
                (err: any) => {
                    if(err instanceof HttpErrorResponse) {
                        if(err.status === 401) {
                            
                        }
                    }
                }
            );
    }
}