import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../shared/models/Company';

declare let swal: any;
declare var $: any;

@Component({
    selector: 'company',
    templateUrl: './company.view.html',
})

export class CompanyComponent implements OnInit {
    companies: Company[] = [];
    company: Company;
    model_header:string = "";

    constructor(private companyService: CompanyService) { }

    ngOnInit() { 
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

    clear() {
        this.company = {
            id: 0,
            image_url: "",
            image_data: "",
            company_name: "",
            website: "",
            description: "",
            created_date: "",
            modified_date: ""
        }
    }

    getCompanyById(companyId) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.companyService.getCompanyById(companyId)
            .then(res => {
                swal.close();
                this.company = res.data as Company;
        });
    }

    imageBase64Code(files: FileList) {
        var file = files.item(0);

        if (file) {
            var reader  = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.company.image_url = file.name;
                this.company.image_data = reader.result.split(',')[1];
            };
        }
    }

    createUpdateCompany() {
        this.companyService.addCompany(this.company)
            .then(res => {
                swal.close();
        });
    }

    deleteCompanyById(companyId) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.companyService.deleteCompanyById(companyId)
            .then(res => {
                swal.close();
                this.companies = res.data as Company[];
        });
    }
}