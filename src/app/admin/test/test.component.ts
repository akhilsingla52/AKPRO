import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
    selector: 'test',
    templateUrl: './test.view.html',
})

export class TestComponent implements OnInit {

    constructor(private testService: TestService) { }

    ngOnInit() {
    }
}