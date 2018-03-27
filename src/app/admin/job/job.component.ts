import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from '../../shared/models/Job';
import { Company } from '../../shared/models/Company';
import { CompanyService } from '../company/company.service';

declare let swal: any;
declare let $: any;

@Component({
    selector: 'job',
    templateUrl: './job.view.html',
})

export class JobComponent implements OnInit {
    jobs: Job[] = [];
    job: Job;
    companies: Company[] = [];
    model_header:string = "";

    constructor(private jobService: JobService, private companyService: CompanyService) { }

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
        this.clear();
    }

    clear() {
        this.job = {
            id: 0,
            company_id: 0,
            company_name: "",
            location: "",
            technology: "",
            role: "",
            experience: "",
            salary: 0.0,
            created_date: "",
            modified_date: ""
        }
    }

    getAllCompanies() {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.companyService.getAllCompanies()
            .then(res => {
                swal.close();
                this.companies = res.data as Company[];
        });

        this.clear();
    }

    openAddModel() {
        this.model_header = "Add";
        this.getAllCompanies();
        this.clear();
    }

    openUpdateModel(job: Job) {
        this.model_header = "Update";
        this.getAllCompanies();
        this.job = job;
    }

    addUpdateJob() {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        if(this.job.id == undefined || this.job.id == 0) {
            this.jobService.addJob(this.job)
                .then(res => {
                    swal.close();
                    $('#jobModel').modal('toggle');
                    this.getAllJobs();
            });
        } else {
            this.jobService.updateJob(this.job)
            .then(res => {
                swal.close();
                $('#jobModel').modal('toggle');
                this.getAllJobs();
            });
        }
    }

    deleteJobById(jobId, index) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.jobService.deleteJobById(jobId)
            .then(res => {
                this.jobs.splice(index,1);
                swal.close();
                //this.getAllJobs();
        });
    }
}