import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../shared/models/Company';
import { APP_IMAGE_URL } from '../../shared/utils/Const'
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'company',
    templateUrl: './company.view.html',
})

export class CompanyComponent extends SweetAlertPopUp implements OnInit {
    form: FormGroup;
    companies: Company[] = [];
    model_header:string = "";
    appImageUrl:string = APP_IMAGE_URL;

    constructor(private companyService: CompanyService) { super(); }

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

    getAllCompanies() {
        this.showLoading();

        this.companyService.getAllCompanies()
            .then(
                success => {
                    this.close();
                    this.companies = success.data as Company[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );

           this.form.reset();
    }

    getCompanyById(companyId) {
        this.showLoading();

        this.companyService.getCompanyById(companyId)
            .then(
                res => {
                    this.close();
                    this.form.setValue(res.data);
                }, error => {
                    this.close();
                    this.errorPopUp();
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
                this.form.controls['image_data'].setValue(reader.result.split(',')[1]);
            };
        }
    }

    createUpdateCompany() {
        this.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.companyService.addCompany(this.form.value)
                .then(
                    res => {
                        this.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllCompanies();

                        this.successPopUp(res.message);
                    }, error => {
                        this.close();
                        this.errorPopUp();
                    }
                );
        } else {
            this.companyService.updateCompany(this.form.value)
            .then(
                res => {
                    this.close();
                    console.log(res);
                    $('#addUpdateModel').modal('toggle');
                    this.getAllCompanies();
                    
                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
        }
    }

    deleteCompanyById(companyId, index) {
        this.showLoading();

        this.companyService.deleteCompanyById(companyId)
            .then(
                res => {
                    this.companies.splice(index, 1);
                    this.close();
                    //this.getAllCompanies();
                    
                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
    }
}