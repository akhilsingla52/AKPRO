import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { ExamDetails } from '../../shared/models/ExamDetails';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import Utils from '../../shared/utils/Utils';

@Component({
    selector: 'test',
    templateUrl: './test.view.html',
})

export class TestComponent implements OnInit {
    examDetails: ExamDetails[] = [];
    params: any = {};
    count: number = 0;

    constructor(private testService: TestService) { }

    ngOnInit() {
        this.reset();
    }

    getAllExamDetails() {
        SweetAlertPopUp.showLoading();

        //page, size, sortby, sortorder, search
        this.testService.getAllExamDetails(this.params.page, this.params.size, this.params.sortby, this.params.sortorder,Utils.convertToHex(this.params.search.trim()))
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.examDetails = res.data as ExamDetails[];
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

        this.getAllExamDetails();
    }

    reset() {
        this.params = {
            'page':'1',
            'size':'5',
            'sortby': '',
            'sortorder': '',
            'search':''
        };

        this.getAllExamDetails();
    }
}