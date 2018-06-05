import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { ExamDetails } from '../../shared/models/ExamDetails';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';

@Component({
    selector: 'test',
    templateUrl: './test.view.html',
})

export class TestComponent extends SweetAlertPopUp implements OnInit {
    examDetails: ExamDetails[] = [];

    constructor(private testService: TestService) { super(); }

    ngOnInit() {
        this.getAllExamDetails();
    }

    getAllExamDetails() {
        this.showLoading();

        this.testService.getAllExamDetails()
            .then(
                res => {
                    this.close();
                    this.examDetails = res.data as ExamDetails[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
    }
}