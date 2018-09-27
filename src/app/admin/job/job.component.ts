import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/Company';
import { JobService } from './job.service';
import { Job } from '../../shared/models/Job';
import { CompanyService } from '../company/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
declare let $: any;

@Component({
    selector: 'job',
    templateUrl: './job.view.html',
})

export class JobComponent implements OnInit {
    form: FormGroup;
    jobs: Job[] = [];
    companies: Company[] = [];
    model_header:string = "";

    constructor(private jobService: JobService, private companyService: CompanyService) { }

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
        SweetAlertPopUp.showLoading();

        this.jobService.getAllJobs()
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.jobs = res.data as Job[];
                }
            );
        this.form.reset();
    }

    getAllCompanies() {
        SweetAlertPopUp.showLoading();

        this.companyService.getAllCompanies()
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.companies = res.data as Company[];
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
        SweetAlertPopUp.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.jobService.addJob(this.form.value)
                .subscribe(
                    res => {
                        SweetAlertPopUp.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllJobs();

                        SweetAlertPopUp.successPopUp(res.message);
                    }
                );
        } else {
            this.jobService.updateJob(this.form.value)
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllJobs();

                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
        }
    }

    deleteJobById(jobId, index) {
        SweetAlertPopUp.showLoading();

        this.jobService.deleteJobById(jobId)
            .subscribe(
                res => {
                    this.jobs.splice(index,1);
                    SweetAlertPopUp.close();
                    //this.getAllJobs();

                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
    }
}