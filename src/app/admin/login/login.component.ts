import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import { UserDetails } from 'src/app/shared/models/UserDetails';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.view.html',
})

export class LoginComponent implements OnInit {
    errorMsg:string = '';
    form: FormGroup;

    constructor(private router:Router, private loginService: LoginService) {
        if(localStorage.getItem('token'))
            this.router.navigate(['admin']);
     }

    ngOnInit() {
        this.form = new FormGroup({
            user_name: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            password: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            })
        });
    }

    login() {
        SweetAlertPopUp.showLoading();
        this.loginService.login(this.form.value)
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    var token = res.data as string;
                    localStorage.setItem('token', token);

                    this.router.navigate(['admin']);
                }, error => {
                    SweetAlertPopUp.close();
                }
            );
        
    }
}