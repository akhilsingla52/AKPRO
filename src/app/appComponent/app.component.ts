import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.view.html',
})
export class AppComponent implements OnInit {

    ngOnInit() {
        // $('body').bind('copy paste cut',function(e) {
        //     e.preventDefault(); return false; 
        // });
    }
}