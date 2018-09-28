import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Question } from '../../shared/models/Question';

@Injectable()
export class QuestionService {
 
    constructor(private http: HttpClient) { }

    getAllQuestions(page, size, sortby, sortorder, search) {
        return this.http.get<any>('questionBank/getAllQuestions?page='+page+'&size='+size+'&sortby='+sortby+'&sortorder='+sortorder+'&search='+search)
            .pipe( map( res => res ) );
    }

    getAllCategories() {
        return this.http.get<any>('questionBank/getAllCategories')
            .pipe( map( res => res ) );
    }

    getQuestionById(questionId) {
        return this.http.get<any>(`questionBank/`+questionId)
            .pipe( map( res => res ) );
    }

    addQuestion(question: Question) {
        return this.http.post<any>(`questionBank/create`, question)
            .pipe( map( res => res ) );
    }

    updateQuestion(question: Question) {
        return this.http.put<any>(`questionBank/update`, question)
            .pipe( map( res => res ) );
    }

    deleteQuestionById(questionId) {
        return this.http.delete<any>(`questionBank/delete/`+questionId)
            .pipe( map( res => res ) );
    }
    
}