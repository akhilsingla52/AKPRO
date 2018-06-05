import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { CategoryService } from '../category/category.service';
import { Question } from '../../shared/models/Question';
import { Category } from '../../shared/models/Category';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';

declare let $: any;

@Component({
    selector: 'question',
    templateUrl: './question.view.html',
})

export class QuestionComponent extends SweetAlertPopUp implements OnInit {
    questions: Question[] = [];
    question: Question;
    categories: Category[] = [];
    model_header: string = "";
    optionsValue: string = "";
    questionOptions: string[] = [];

    constructor(private questionService: QuestionService, private categoryService: CategoryService) { super(); }

    ngOnInit() {
        this.getAllQuestions();
    }

    getAllQuestions() {
        this.showLoading();

        this.questionService.getAllQuestions()
            .then(
                res => {
                    this.close();
                    this.questions = res.data as Question[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
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
        this.showLoading();

        this.categoryService.getAllCategories()
            .then(
                res => {
                    this.close();
                    this.categories = res.data as Category[];
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
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
            //console.log(options);
            this.question.options = options;
        }
        this.showLoading();
        if(this.question.id == undefined || this.question.id == 0) {
            this.questionService.addQuestion(this.question)
                .then(
                    res => {
                        this.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllQuestions();

                        this.successPopUp(res.message);
                    }, error => {
                        this.close();
                        this.errorPopUp();
                    }
                );
        } else {
            this.questionService.updateQuestion(this.question)
            .then(
                res => {
                    this.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllQuestions();

                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
        }
    }

    deleteQuestionById(jobId, index) {
        this.showLoading();

        this.questionService.deleteQuestionById(jobId)
            .then(
                res => {
                    this.questions.splice(index,1);
                    this.close();
                    //this.getAllQuestions();

                    this.successPopUp(res.message);
                }, error => {
                    this.close();
                    this.errorPopUp();
                }
            );
    }
}