import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'user',
    templateUrl: './user.view.html',
})

export class UserComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}