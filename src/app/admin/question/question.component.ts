import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from '../../shared/models/Question';
import { Category } from '../../shared/models/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
declare let $: any;

@Component({
    selector: 'question',
    templateUrl: './question.view.html',
})

export class QuestionComponent implements OnInit {
    form: FormGroup;
    questions: Question[] = [];
    categories: Category[] = [];
    model_header: string = "";
    questionOptions: string[] = [];

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.formValidations();
        this.getAllQuestions();
    }

    formValidations() {
        this.form = new FormGroup({
            id: new FormControl(''),
            category_id: new FormControl( 0, {
                validators: Validators.required,
                updateOn: 'change'
            }),
            category_name: new FormControl(),
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
        SweetAlertPopUp.showLoading();

        this.questionService.getAllQuestions()
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.questions = res.data as Question[];
                }
            );
        this.form.reset();
    }

    getAllCategories() {
        SweetAlertPopUp.showLoading();

        this.questionService.getAllCategories()
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.categories = res.data as Category[];
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
        SweetAlertPopUp.showLoading();
        if(this.form.value.id == undefined || this.form.value.id == 0) {
            this.questionService.addQuestion(this.form.value)
                .subscribe(
                    res => {
                        SweetAlertPopUp.close();
                        $('#addUpdateModel').modal('toggle');
                        this.getAllQuestions();

                        SweetAlertPopUp.successPopUp(res.message);
                    }
                );
        } else {
            this.questionService.updateQuestion(this.form.value)
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    $('#addUpdateModel').modal('toggle');
                    this.getAllQuestions();

                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
        }
    }

    deleteQuestionById(jobId, index) {
        SweetAlertPopUp.showLoading();

        this.questionService.deleteQuestionById(jobId)
            .subscribe(
                res => {
                    this.questions.splice(index,1);
                    SweetAlertPopUp.close();
                    //this.getAllQuestions();

                    SweetAlertPopUp.successPopUp(res.message);
                }
            );
    }
}