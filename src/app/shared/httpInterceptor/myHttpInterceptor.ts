import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, 
            HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_URL, TOKEN_PREFIX } from '../utils/Const';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = TOKEN_PREFIX + localStorage.getItem("token");
        const authReq = req.clone({ 
            url: (APP_URL + req.url),
            headers: req.headers.set('Authorization', token)
        });

        console.log('Intercepted HTTP call', authReq);

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