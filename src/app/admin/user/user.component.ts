import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserDetails } from '../../shared/models/UserDetails';

declare let swal: any;

@Component({
    selector: 'user',
    templateUrl: './user.view.html',
})

export class UserComponent implements OnInit {
    userList: UserDetails[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.userService.getAllUser()
            .then(res => {
                swal.close();
                this.userList = res.data as UserDetails[];
        });
    }
}