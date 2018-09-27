import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { ExamDetails } from '../../shared/models/ExamDetails';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';

@Component({
    selector: 'test',
    templateUrl: './test.view.html',
})

export class TestComponent implements OnInit {
    examDetails: ExamDetails[] = [];

    constructor(private testService: TestService) { }

    ngOnInit() {
        this.getAllExamDetails();
    }

    getAllExamDetails() {
        SweetAlertPopUp.showLoading();

        this.testService.getAllExamDetails()
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.examDetails = res.data as ExamDetails[];
                }
            );
    }
}