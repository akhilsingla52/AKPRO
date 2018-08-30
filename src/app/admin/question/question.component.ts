import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { CategoryService } from '../category/category.service';
import { Question } from '../../shared/models/Question';
import { Category } from '../../shared/models/Category';
import { SweetAlertPopUp } from '../../shared/utils/SweetAlertPopUp';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
    selector: 'question',
    templateUrl: './question.view.html',
})

export class QuestionComponent extends SweetAlertPopUp implements OnInit {
    form: FormGroup;
    questions: Question[] = [];
    categories: Category[] = [];
    model_header: string = "";
    questionOptions: string[] = [];

    constructor(private questionService: QuestionService) { super(); }

    ngOnInit() {
        this.formValidations();
        this.getAllQuestions();
    }

    formValidations() {
        this.form = new FormGroup({
            id: new FormControl(''),
            category_id: new FormControl('0', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            category_name: new FormControl(''),
            question: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            options: new FormControl([]),
            optionValue: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            answer: new FormControl('', {
                validators: Validators.required,
                updateOn: 'change'
            }),
            created_date: new FormControl(''),
            modified_date: new FormControl(''),
        });
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
        this.form.reset();
    }

    getAllCategories() {
        this.showLoading();

        this.questionService.getAllCategories()
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
        this.form.reset();
    }

    openUpdateModel(question: Question) {
        this.model_header = "Update";
        this.getAllCategories();
        var editQuestion:any = question;
        console.log(editQuestion);
        editQuestion.optionValue = editQuestion.options.join("\n");
        this.form.setValue(editQuestion);
    }

    addUpdateQuestion() {
        if(this.form.value.optionValue!="")
            this.form.value.options = this.form.value.optionValue.split("\n");
        this.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.questionService.addQuestion(this.form.value)
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
            this.questionService.updateQuestion(this.form.value)
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