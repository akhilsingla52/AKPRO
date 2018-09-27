import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Company } from '../../shared/models/Company';

@Injectable()
export class CompanyService {
 
    constructor(private http: HttpClient) { }

    getAllCompanies(){
        return this.http.get<any>(`company/getAll`)
            .pipe( map( res => res ) );
    }

    getCompanyById(companyId) {
        return this.http.get<any>(`company/`+companyId)
            .pipe( map( res => res ) );
    }

    addCompany(company: Company) {
        return this.http.post<any>(`company/create`, company)
            .pipe( map( res => res ) );
    }

    updateCompany(company: Company) {
        return this.http.put<any>(`company/update`, company)
            .pipe( map( res => res ) );
    }

    deleteCompanyById(companyId) {
        return this.http.delete<any>(`company/delete/`+companyId)
            .pipe( map( res => res ) );
    }
    
}