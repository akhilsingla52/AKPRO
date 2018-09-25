import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page.notfound.view.html',
    styleUrls: ['./pagenotfound.view.scss']
})

export class PageNotFoundComponent implements OnInit {
    home:any ="login";

    ngOnInit(){
    }
}
