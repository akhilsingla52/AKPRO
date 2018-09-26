import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../shared/models/Question';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class QuestionService {
 
    constructor(private http: HttpClient) { }

    getAllCategories() {
        return this.http.get('questionCategory/getAllCategories')
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    getAllQuestions() {
        return this.http.get(`questionBank/getAll`)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    getQuestionById(questionId) {
        return this.http.get(`questionBank/`+questionId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    addQuestion(question: Question) {
        return this.http.post(`questionBank/create`, question)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    updateQuestion(question: Question) {
        return this.http.put(`questionBank/update`, question)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    deleteQuestionById(questionId) {
        return this.http.delete(`questionBank/delete/`+questionId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}