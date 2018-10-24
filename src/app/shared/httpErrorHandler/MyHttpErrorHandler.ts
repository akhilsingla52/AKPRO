import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";   

import SweetAlertPopUp from "../utils/SweetAlertPopUp";

@Injectable()
export class MyHttpErrorHandler implements ErrorHandler {
    
    constructor(private injector:Injector) { }

    handleError(error: any) {
        const router = this.injector.get(Router);
        console.log('Request URL: ${router.url}');
        SweetAlertPopUp.close();
        SweetAlertPopUp.error("some error occur");
        
        if(error instanceof HttpErrorResponse) {
            console.error('Backend returned status code: ', error.status);
            console.error('Response body: ', error.message);
        } else {
            console.error('An error occurred: ', error.message);  
        }

        //SweetAlertPopUp.error(error);
    }
}