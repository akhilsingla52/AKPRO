import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserDetails } from '../../shared/models/UserDetails';
import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import Utils from '../../shared/utils/Utils';

@Component({
    selector: 'user',
    templateUrl: './user.view.html',
})

export class UserComponent implements OnInit {
    userList: UserDetails[] = [];
    params: any = {};
    count: number = 0;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.reset();
    }

    getAllUsers() {
        SweetAlertPopUp.showLoading();

        //page, size, sortby, sortorder, search
        this.userService.getAllUser(this.params.page, this.params.size, this.params.sortby, this.params.sortorder,Utils.convertToHex(this.params.search.trim()))
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.userList = res.data as UserDetails[];
                    this.count = res.count as number;
                }
            );
    }

    orderBy(sortBy) {
        if(sortBy!= this.params.sortby)
            this.params.sortorder="DESC"
        this.params.sortby=sortBy;

        if(this.params.sortorder=="ASC")
            this.params.sortorder="DESC"
        else
            this.params.sortorder="ASC"

        this.getAllUsers();
    }

    reset() {
        this.params = {
            'page':'1',
            'size':'5',
            'sortby': '',
            'sortorder': '',
            'search':''
        };

        this.getAllUsers();
    }
}