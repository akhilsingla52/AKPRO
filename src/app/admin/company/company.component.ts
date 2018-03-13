import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';

@Component({
    selector: 'company',
    templateUrl: './company.view.html',
})

export class CompanyComponent implements OnInit {

    constructor(private companyService: CompanyService) { }

    ngOnInit() {
    }
}