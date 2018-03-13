import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';

@Component({
    selector: 'job',
    templateUrl: './job.view.html',
})

export class JobComponent implements OnInit {

    constructor(private jobService: JobService) { }

    ngOnInit() {
    }
}