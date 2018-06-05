import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../../shared/models/Category';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'category',
    templateUrl: './category.view.html',
})

export class CategoryComponent extends SweetAlertPopUp implements OnInit {
    form: FormGroup;
    categories: Category[] = [];
    model_header:string = "";

    constructor(private categoryService: CategoryService) { super(); }

    ngOnInit() {
        this.formValidations();
        this.getAllCategories();
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

    getAllCategories() {
        this.showLoading();

        this.categoryService.getAllCategories()
            .then(
                res => {
                    this.close();
                    this.categories = res.data as Category[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );

        this.form.reset();
    }

    getCategoryById(categoryId) {
        this.showLoading();

        this.categoryService.getCategoryById(categoryId)
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

    openUpdateModel(category: Category) {
        this.model_header = "Update";
        this.form.setValue(category);
    }

    createUpdateCategory() {
        this.showLoading();
        if (this.form.value.id == undefined || this.form.value.id == 0) {
            this.categoryService.addCategory(this.form.value)
                .then(
                    res => {
                        this.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllCategories();
                        
                        this.successPopUp(res.message);
                    }, error => {
                        this.close();
                        this.errorPopUp();
                    }
                );
        } else {
            this.categoryService.updateCategory(this.form.value)
                .then(
                    res => {
                        this.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllCategories();
                        
                        this.successPopUp(res.message);
                    }, error => {
                        this.close();
                        this.errorPopUp();
                    }
                );
        }
    }

    deleteCategoryById(categoryId, index) {
        this.showLoading();

        this.categoryService.deleteCategoryById(categoryId)
            .then(
                res => {
                    this.categories.splice(index, 1);
                    this.close();
                    //this.getAllCategories();
                    
                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
    }
}