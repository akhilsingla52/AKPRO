import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from '../../shared/models/Company';
import { APP_IMAGE_URL } from '../../shared/utils/Const'

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
    appImageUrl:string = APP_IMAGE_URL;

    constructor(private companyService: CompanyService) { }

    ngOnInit() { 
        this.getAllCompanies();
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
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        if(this.company.id == undefined || this.company.id == 0) {
            this.companyService.addCompany(this.company)
                .then(res => {
                    swal.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllCompanies();
            });
        } else {
            this.companyService.updateCompany(this.company)
            .then(res => {
                swal.close();
                $('#addUpdateModel').modal('toggle');
                this.getAllCompanies();
            });
        }
    }

    deleteCompanyById(companyId, index) {
        swal({
            title: 'Loading...'
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