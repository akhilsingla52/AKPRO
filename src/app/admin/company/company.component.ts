import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../shared/models/Company';
import { APP_IMAGE_URL } from '../../shared/utils/Const'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
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

    constructor(private companyService: CompanyService) { }

    ngOnInit() { 
        this.formValidations();
        this.getAllCompanies();
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

        this.companyService.getAllCompanies()
            .subscribe(
                success => {
                    SweetAlertPopUp.close();
                    this.companies = success.data as Company[];
                }
            );

           this.form.reset();
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