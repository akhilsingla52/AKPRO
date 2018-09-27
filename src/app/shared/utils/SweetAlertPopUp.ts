// declare let swal: any;
import swal from 'sweetalert2';

export default class SweetAlertPopUp {

    constructor() {}
    
    public static showLoading() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        swal.showLoading();
    }

    public static close() {
        swal.close();
    }

    public static errorPopUp() {
        swal({
            title: "some error occur",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000
        })
    }

    public static error(message) {
        swal({
            title: message,  
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000
        })
    }

    public static successPopUp(message) {
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