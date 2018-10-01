import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from '../../shared/models/Question';
import { Category } from '../../shared/models/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import SweetAlertPopUp from '../../shared/utils/SweetAlertPopUp';
import Utils from '../../shared/utils/Utils';
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
    params: any = {};
    count: number = 0;
    option: string = '';

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.formValidations();
        this.reset();
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

        //page, size, sortby, sortorder, search
        this.questionService.getAllQuestions(this.params.page, this.params.size, this.params.sortby, this.params.sortorder,Utils.convertToHex(this.params.search.trim()))
            .subscribe(
                res => {
                    SweetAlertPopUp.close();
                    this.questions = res.data as Question[];
                    this.count = res.count as number;
                }
            );
        this.form.reset();
    }

    orderBy(sortBy) {
        if(sortBy!= this.params.sortby)
            this.params.sortorder="DESC"
        this.params.sortby=sortBy;

        if(this.params.sortorder=="ASC")
            this.params.sortorder="DESC"
        else
            this.params.sortorder="ASC"

        this.getAllQuestions();
    }

    reset() {
        this.params = {
            'page':'1',
            'size':'5',
            'sortby': '',
            'sortorder': '',
            'search':''
        };

        this.getAllQuestions();
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
        this.option = '';
        this.getAllCategories();
        this.form.reset();
    }

    openUpdateModel(question: Question) {
        this.model_header = "Update";
        this.option = '';
        this.getAllCategories();    
        this.form.setValue(question);

    }

    addOption() { 
        if(this.form.get('options').value==null || this.form.get('options').value==undefined)
            this.form.get('options').setValue([]);
        
        this.form.get('options').value.push(this.option);
        this.option = '';
    }

    deleteOption(index) {
        this.form.get('options').value.splice(index, 1);
    }

    addUpdateQuestion() {
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