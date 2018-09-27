import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../../shared/models/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import Utils from '../../shared/utils/Utils';

declare var $: any;

@Component({
    selector: 'category',
    templateUrl: './category.view.html',
})

export class CategoryComponent implements OnInit {
    form: FormGroup;
    params: any = {};
    categories: Category[] = [];
    count: number = 0;
    model_header:string = "";

    constructor(private categoryService: CategoryService) {  }

    ngOnInit() {
        this.formValidations();
        this.reset();
    }

    formValidations() {
        this.form = new FormGroup({
            id: new FormControl(''),
            category_name: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            created_date: new FormControl(''),
            modified_date: new FormControl(''),
        });
    }

    orderBy(sortBy) {
        if(sortBy!= this.params.sortby)
            this.params.sortorder="DESC"
        this.params.sortby=sortBy;

        if(this.params.sortorder=="ASC")
            this.params.sortorder="DESC"
        else
            this.params.sortorder="ASC"

        this.getAllCategories();
    }

    getAllCategories() {
        SweetAlertPopUp.showLoading();

        //page, size, sortby, sortorder, search
        this.categoryService.getAllCategories(this.params.page, this.params.size, this.params.sortby, this.params.sortorder,Utils.convertToHex(this.params.search.trim()))
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.categories = res.data as Category[];
                    this.count = res.count as number;
                }
            );

        this.form.reset();
    }

    reset() {
        this.params = {
            'page':'1',
            'size':'5',
            'sortby': '',
            'sortorder': '',
            'search':''
        };
    }

    getCategoryById(categoryId) {
        SweetAlertPopUp.showLoading();

        this.categoryService.getCategoryById(categoryId)
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

    openUpdateModel(category: Category) {
        this.model_header = "Update";
        this.form.reset();
        this.form.setValue(category);
    }

    createUpdateCategory() {
        SweetAlertPopUp.showLoading();
        if (this.form.value.id == undefined || this.form.value.id == 0) {
            this.categoryService.addCategory(this.form.value)
                .subscribe(
                    res => {
                        SweetAlertPopUp.close();
                        $('#addUpdateModel').modal('toggle');
                        this.reset();
                        
                        SweetAlertPopUp.successPopUp(res.message);
                    }
                );
        } else {
            this.categoryService.updateCategory(this.form.value)
                .subscribe(
                    res => {
                        SweetAlertPopUp.close();
                        $('#addUpdateModel').modal('toggle');
                        this.reset();
                        
                        SweetAlertPopUp.successPopUp(res.message);
                    }
                );
        }
    }

    deleteCategoryById(categoryId) {
        SweetAlertPopUp.showLoading();

        this.categoryService.deleteCategoryById(categoryId)
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.reset();
                    
                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
    }
}