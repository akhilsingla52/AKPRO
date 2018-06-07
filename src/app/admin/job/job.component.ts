import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/Company';
import { JobService } from './job.service';
import { Job } from '../../shared/models/Job';
import { CompanyService } from '../company/company.service';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
    selector: 'job',
    templateUrl: './job.view.html',
})

export class JobComponent extends SweetAlertPopUp implements OnInit {
    form: FormGroup;
    jobs: Job[] = [];
    companies: Company[] = [];
    model_header:string = "";

    constructor(private jobService: JobService, private companyService: CompanyService) { super(); }

    ngOnInit() {
        this.formValidations();
        this.getAllJobs();
    }

    formValidations() {
        this.form = new FormGroup({
            id: new FormControl(''),
            company_id: new FormControl('0', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            company_name: new FormControl(''),
            location: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            technology: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            role: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            experience: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            salary: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            created_date: new FormControl(''),
            modified_date: new FormControl(''),
        });
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
        this.form.reset();
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
        this.form.reset();
    }

    openUpdateModel(job: Job) {
        this.model_header = "Update";
        this.getAllCompanies();
        this.form.reset();
        this.form.setValue(job);
    }

    addUpdateJob() {
        this.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.jobService.addJob(this.form.value)
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
            this.jobService.updateJob(this.form.value)
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