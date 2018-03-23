import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.view.html',
})

export class DashboardComponent implements OnInit {

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        
    }
}