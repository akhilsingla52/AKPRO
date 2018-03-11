import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.view.html',
})

export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService) { }

    ngOnInit() {
    }
}