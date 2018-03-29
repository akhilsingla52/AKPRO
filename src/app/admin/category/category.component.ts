import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../../shared/models/Category';

declare let swal: any;
declare var $: any;

@Component({
    selector: 'category',
    templateUrl: './category.view.html',
})

export class CategoryComponent implements OnInit {
    categories: Category[] = [];
    category: Category;
    model_header:string = "";

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.getAllCategories();
    }

    getAllCategories() {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.categoryService.getAllCategories()
            .then(res => {
                swal.close();
                this.categories = res.data as Category[];
            });

        this.clear();
    }

    clear() {
        this.category = {
            id: 0,
            category_name: "",
            created_date: "",
            modified_date: ""
        }
    }

    getCategoryById(categoryId) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.categoryService.getCategoryById(categoryId)
            .then(res => {
                swal.close();
                this.category = res.data as Category;
            });
    }

    openAddModel() {
        this.model_header = "Add";
        this.clear();
    }

    openUpdateModel(category: Category) {
        this.model_header = "Update";
        this.category = category;
    }

    createUpdateCategory() {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        if (this.category.id == undefined || this.category.id == 0) {
            this.categoryService.addCategory(this.category)
                .then(res => {
                    swal.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllCategories();
                });
        } else {
            this.categoryService.updateCategory(this.category)
                .then(res => {
                    swal.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllCategories();
                });
        }
    }

    deleteCategoryById(categoryId, index) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.categoryService.deleteCategoryById(categoryId)
            .then(res => {
                this.categories.splice(index, 1);
                swal.close();
                //this.getAllCategories();
            });
    }
}