import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';

@Component({
    selector: 'category',
    templateUrl: './category.view.html',
})

export class CategoryComponent implements OnInit {

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
    }
}