import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Company } from '../../shared/models/Company';


@Injectable()
export class CompanyService {
 
    constructor(private http: HttpClient) { }

    getAllCompanies(){
        return this.http.get(`company/allCompanies`)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    getCompanyById(companyId) {
        return this.http.get(`company/`+companyId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    addCompany(company: Company) {
        return this.http.post(`company/create`, company)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    updateCompany(company: Company) {
        return this.http.put(`company/update`, company)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    deleteCompanyById(companyId) {
        return this.http.delete(`company/delete/`+companyId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}