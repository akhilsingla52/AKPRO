// declare let swal: any;
import swal from 'sweetalert2';

export class SweetAlertPopUp {

    constructor() {}
    
    public showLoading() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        swal.showLoading();
    }

    public close() {
        swal.close();
    }

    public errorPopUp() {
        swal({
            title: "some error occur",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000
        })
    }

    public error(message) {
        swal({
            title: message,  
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000
        })
    }

    public successPopUp(message) {
        swal({
            title: message,
            type: "success",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000
        })
    }
}