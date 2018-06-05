import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/Company';
import { JobService } from './job.service';
import { Job } from '../../shared/models/Job';
import { CompanyService } from '../company/company.service';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';

declare let $: any;

@Component({
    selector: 'job',
    templateUrl: './job.view.html',
})

export class JobComponent extends SweetAlertPopUp implements OnInit {
    jobs: Job[] = [];
    job: Job;
    companies: Company[] = [];
    model_header:string = "";

    constructor(private jobService: JobService, private companyService: CompanyService) { super(); }

    ngOnInit() {
        this.getAllJobs();
    }

    getAllJobs() { 
        this.showLoading();

        this.jobService.getAllJobs()
            .then(
                res => {
                    this.close();
                    this.jobs = res.data as Job[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
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
        this.showLoading();

        this.companyService.getAllCompanies()
            .then(
                res => {
                    this.close();
                    this.companies = res.data as Company[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
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
        this.showLoading();
        if(this.job.id == undefined || this.job.id == 0) {
            this.jobService.addJob(this.job)
                .then(
                    res => {
                        this.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllJobs();

                        this.successPopUp(res.message);
                    }, error => {
                        this.close();
                        this.errorPopUp();
                    }
                );
        } else {
            this.jobService.updateJob(this.job)
            .then(
                res => {
                    this.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllJobs();

                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
        }
    }

    deleteJobById(jobId, index) {
        this.showLoading();

        this.jobService.deleteJobById(jobId)
            .then(
                res => {
                    this.jobs.splice(index,1);
                    this.close();
                    //this.getAllJobs();

                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
    }
}