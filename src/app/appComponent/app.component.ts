import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

declare let $: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.view.html',
})
export class AppComponent implements OnInit {
    public config: PerfectScrollbarConfigInterface = {};

    ngOnInit() {
    }
}