import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../shared/models/Company';
import { APP_IMAGE_URL } from '../../shared/utils/Const'
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let swal: any;
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
                validators: Validators.required,
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

    onSubmit() {
        if(this.form.valid) {
            console.log(this.form);
            console.log("Form Submitted!", this.form.value);
            this.form.reset();
        }
    }

    getAllCompanies() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();

        this.companyService.getAllCompanies()
            .then(res => {
                swal.close();
                this.companies = res.data as Company[];
        });

        this.clear();
    }

    clear() {
        this.form.reset();
    }

    getCompanyById(companyId) {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();

        this.companyService.getCompanyById(companyId)
            .then(res => {
                swal.close();
                this.form.setValue(res.data);
        });
    }

    imageBase64Code(files: FileList) {
        var file = files.item(0);

        if (file) {
            var reader  = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.form.value.image_url = file.name;
                this.form.value.image_data = reader.result.split(',')[1];
            };
        }
    }

    createUpdateCompany() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.companyService.addCompany(this.form.value)
                .then(res => {
                    swal.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllCompanies();
            });
        } else {
            this.companyService.updateCompany(this.form.value)
            .then(res => {
                swal.close();
                $('#addUpdateModel').modal('toggle');
                this.getAllCompanies();
            });
        }
    }

    deleteCompanyById(companyId, index) {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();

        this.companyService.deleteCompanyById(companyId)
            .then(res => {
                this.companies.splice(index, 1);
                swal.close();
                //this.getAllCompanies();
        });
    }
}