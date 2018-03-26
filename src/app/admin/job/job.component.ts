import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from '../../shared/models/Job';

declare let swal: any;

@Component({
    selector: 'job',
    templateUrl: './job.view.html',
})

export class JobComponent implements OnInit {
    jobs: Job[] = [];

    constructor(private jobService: JobService) { }

    ngOnInit() {
        this.getAllJobs();
    }

    getAllJobs() {     
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.jobService.getAllJobs()
            .then(res => {
                swal.close();
                this.jobs = res.data as Job[];
        });
    }
}