import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserDetails } from '../../shared/models/UserDetails';
import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';

@Component({
    selector: 'user',
    templateUrl: './user.view.html',
})

export class UserComponent implements OnInit {
    userList: UserDetails[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getAllUser();
    }

    getAllUser() {
        SweetAlertPopUp.showLoading();

        this.userService.getAllUser()
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.userList = res.data as UserDetails[];
                }
            );
    }
}