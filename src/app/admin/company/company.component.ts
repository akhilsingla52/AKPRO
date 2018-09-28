import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../shared/models/Company';
import { APP_IMAGE_URL } from '../../shared/utils/Const'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import Utils from '../../shared/utils/Utils';
declare var $: any;

@Component({
    selector: 'company',
    templateUrl: './company.view.html',
})

export class CompanyComponent implements OnInit {
    form: FormGroup;
    companies: Company[] = [];
    model_header:string = "";
    appImageUrl:string = APP_IMAGE_URL;
    description:string = "";
    params: any = {};
    count: number = 0;

    constructor(private companyService: CompanyService) { }

    ngOnInit() { 
        this.formValidations();
        this.reset();
    }

    formValidations() {
        this.form = new FormGroup({
            id: new FormControl(''),
            company_name: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            website: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            description: new FormControl('', {
                validators: [Validators.required, Validators.maxLength(200)],
                updateOn: 'change'
            }),
            image_url: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            image_data: new FormControl(''),
            created_date: new FormControl(''),
            modified_date: new FormControl(''),
        });
    }

    getAllCompanies() {
        SweetAlertPopUp.showLoading();

        //page, size, sortby, sortorder, search
        this.companyService.getAllCompanies(this.params.page, this.params.size, this.params.sortby, this.params.sortorder,Utils.convertToHex(this.params.search.trim()))
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.companies = res.data as Company[];
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

        this.getAllCompanies();
    }

    reset() {
        this.params = {
            'page':'1',
            'size':'5',
            'sortby': '',
            'sortorder': '',
            'search':''
        };

        this.getAllCompanies();
    }

    getCompanyById(companyId) {
        SweetAlertPopUp.showLoading();

        this.companyService.getCompanyById(companyId)
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.form.setValue(res.data);
                }
            );
    }

    openAddModel() {
        this.form.reset();
        this.model_header = "Add";
    }

    openUpdateModel(companyId:number) {
        this.model_header = "Update";
        this.getCompanyById(companyId);
    }

    imageBase64Code(files: FileList) {
        var file = files.item(0);

        if (file) {
            var reader  = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.form.controls['image_url'].setValue(file.name);
                this.form.controls['image_data'].setValue(reader.result.toString().split(',')[1]);
            };
        }
    }

    createUpdateCompany() {
        SweetAlertPopUp.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.companyService.addCompany(this.form.value)
                .subscribe(
                    res => {
                        SweetAlertPopUp.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllCompanies();

                        SweetAlertPopUp.successPopUp(res.message);
                    }
                );
        } else {
            this.companyService.updateCompany(this.form.value)
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    console.log(res);
                    $('#addUpdateModel').modal('toggle');
                    this.getAllCompanies();
                    
                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
        }
    }

    deleteCompanyById(companyId, index) {
        SweetAlertPopUp.showLoading();

        this.companyService.deleteCompanyById(companyId)
            .subscribe(
                res => {
                    this.companies.splice(index, 1);
                    SweetAlertPopUp.close();
                    //this.getAllCompanies();
                    
                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
    }
}