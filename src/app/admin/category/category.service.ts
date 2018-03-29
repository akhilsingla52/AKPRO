import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../../shared/models/Category';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {
 
    constructor(private http: HttpClient) { }

    getAllCategories(){
        return this.http.get(`questionCategory/getAll`)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    getCategoryById(categoryId) {
        return this.http.get(`questionCategory/`+categoryId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    addCategory(category: Category) {
        return this.http.post(`questionCategory/create`, category)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    updateCategory(category: Category) {
        return this.http.put(`questionCategory/update`, category)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    deleteCategoryById(categoryId) {
        return this.http.delete(`questionCategory/delete/`+categoryId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}