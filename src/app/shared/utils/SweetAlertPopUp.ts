declare let swal: any;

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