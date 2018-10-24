import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
    selector: 'header',
    templateUrl: './header.view.html',
})

export class HeaderComponent implements OnInit {

    constructor(private router:Router, private headerService:HeaderService) { }

    ngOnInit() {
    }

    logout() {
        this.headerService.logout()
            .subscribe(
                res => {
                    localStorage.clear();
                    this.router.navigate(['login']);
                }
            );
    }
}