import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from '../../shared/models/Category';

@Injectable()
export class CategoryService {
 
    constructor(private http: HttpClient) { }

    getAllCategories(page, size, sortby, sortorder, search){
        return this.http.get<any>('questionCategory/getAllCategories?page='+page+'&size='+size+'&sortby='+sortby+'&sortorder='+sortorder+'&search='+search)
            .pipe( map( res => res ) );
    }

    getCategoryById(categoryId) {
        return this.http.get<any>(`questionCategory/`+categoryId)
            .pipe( map( res => res ) );
    }

    addCategory(category: Category) {
        return this.http.post<any>(`questionCategory/create`, category)
            .pipe( map( res => res ) );
    }

    updateCategory(category: Category) {
        return this.http.put<any>(`questionCategory/update`, category)
            .pipe( map( res => res ) );
    }

    deleteCategoryById(categoryId) {
        return this.http.delete<any>(`questionCategory/delete/`+categoryId)
            .pipe( map( res => res ) );
    }
    
}