import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { CategoryService } from '../category/category.service';
import { Question } from '../../shared/models/Question';
import { Category } from '../../shared/models/Category';

declare let swal: any;
declare let $: any;

@Component({
    selector: 'question',
    templateUrl: './question.view.html',
})

export class QuestionComponent implements OnInit {
    questions: Question[] = [];
    question: Question;
    categories: Category[] = [];
    model_header: string = "";
    optionsValue: string = "";
    questionOptions: string[] = [];

    constructor(private questionService: QuestionService, private categoryService: CategoryService) { }

    ngOnInit() {
        this.getAllQuestions();
    }

    getAllQuestions() {     
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.questionService.getAllQuestions()
            .then(res => {
                swal.close();
                this.questions = res.data as Question[];
        });
        this.clear();
    }

    clear() {
        this.question = {
            id: 0,
            category_id: 0,
            category_name: "",
            question: "",
            options: [],
            answer: "",
            created_date: "",
            modified_date: ""
        }
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
    }

    openAddModel() {
        this.model_header = "Add";
        this.getAllCategories();
        this.clear();
    }

    openUpdateModel(question: Question) {
        this.model_header = "Update";
        this.getAllCategories();
        this.question = question;
        this.optionsValue = this.question.options.join("\n");
    }

    addUpdateQuestion() {
        if(this.optionsValue!="") {
            var options = this.optionsValue.split("\n");
            console.log(options);
            this.question.options = options;
        }
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        if(this.question.id == undefined || this.question.id == 0) {
            this.questionService.addQuestion(this.question)
                .then(res => {
                    swal.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllQuestions();
            });
        } else {
            this.questionService.updateQuestion(this.question)
            .then(res => {
                swal.close();
                $('#addUpdateModel').modal('toggle');
                this.getAllQuestions();
            });
        }
    }

    deleteQuestionById(jobId, index) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();

        this.questionService.deleteQuestionById(jobId)
            .then(res => {
                this.questions.splice(index,1);
                swal.close();
                //this.getAllQuestions();
        });
    }
}