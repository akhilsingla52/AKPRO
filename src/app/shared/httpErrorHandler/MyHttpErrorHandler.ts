import { ErrorHandler, Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';

import swal from 'sweetalert2';

@Injectable()
export class MyHttpErrorHandler implements ErrorHandler {
    handleError(error: any): Promise<any> {
        swal({
            title: "some error occur",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000
        })

        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}