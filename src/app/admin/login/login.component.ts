import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.view.html',
})

export class LoginComponent implements OnInit {

    constructor(private router:Router, private loginService: LoginService) { }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['admin']);
    }
}