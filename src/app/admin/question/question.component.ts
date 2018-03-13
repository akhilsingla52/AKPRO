import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';

@Component({
    selector: 'question',
    templateUrl: './question.view.html',
})

export class QuestionComponent implements OnInit {

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
    }
}