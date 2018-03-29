export class Question {
    id: number;
    category_id: number;
    category_name: string;
    question: string;
    options: string[];
    answer: string;
	created_date: string;
	modified_date: string;

    constructor(id: number, category_id: number, category_name: string, question: string, options: string[], answer: string, created_date: string, modified_date: string) {
        this.id = id;
        this.category_id = category_id;
        this.category_name = category_name;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.created_date = created_date;
        this.modified_date = modified_date;
    }
}