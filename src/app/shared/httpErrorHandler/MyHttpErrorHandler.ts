import { ErrorHandler, Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';

import { SweetAlertPopUp } from "../utils/SweetAlertPopUp";

@Injectable()
export class MyHttpErrorHandler extends SweetAlertPopUp implements ErrorHandler {
    handleError(error: any): Promise<any> {
        this.error(error);
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}