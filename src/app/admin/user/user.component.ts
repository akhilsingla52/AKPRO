import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserDetails } from '../../shared/models/UserDetails';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';

@Component({
    selector: 'user',
    templateUrl: './user.view.html',
})

export class UserComponent extends SweetAlertPopUp implements OnInit {
    userList: UserDetails[] = [];

    constructor(private userService: UserService) { super(); }

    ngOnInit() {
        this.getAllUser();
    }

    getAllUser() {
        this.showLoading();

        this.userService.getAllUser()
            .then(
                res => {
                    this.close();
                    this.userList = res.data as UserDetails[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
    }
}