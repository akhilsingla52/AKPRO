import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/Company';
import { JobService } from './job.service';
import { Job } from '../../shared/models/Job';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import Utils from '../../shared/utils/Utils';
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
    params: any = {};
    count: number = 0;

    constructor(private jobService: JobService) { }

    ngOnInit() {
        this.formValidations();
        this.reset();
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

        //page, size, sortby, sortorder, search
        this.jobService.getAllJobs(this.params.page, this.params.size, this.params.sortby, this.params.sortorder,Utils.convertToHex(this.params.search.trim()))
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.jobs = res.data as Job[];
                    this.count = res.count as number;
                }
            );
        this.form.reset();
    }

    orderBy(sortBy) {
        if(sortBy!= this.params.sortby)
            this.params.sortorder="DESC"
        this.params.sortby=sortBy;

        if(this.params.sortorder=="ASC")
            this.params.sortorder="DESC"
        else
            this.params.sortorder="ASC"

        this.getAllJobs();
    }

    reset() {
        this.params = {
            'page':'1',
            'size':'5',
            'sortby': '',
            'sortorder': '',
            'search':''
        };

        this.getAllJobs();
    }

    getAllCompanies() {
        SweetAlertPopUp.showLoading();

        this.jobService.getAllCompanies()
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