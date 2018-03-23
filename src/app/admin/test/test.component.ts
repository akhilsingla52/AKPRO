import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { ExamDetails } from '../../shared/models/ExamDetails';

declare let swal: any;

@Component({
    selector: 'test',
    templateUrl: './test.view.html',
})

export class TestComponent implements OnInit {
    examDetails: ExamDetails[] = [];

    constructor(private testService: TestService) { }

    ngOnInit() {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.testService.getAllExamDetails()
            .then(res => {
                swal.close();
                this.examDetails = res.data as ExamDetails[];
        });
    }
}