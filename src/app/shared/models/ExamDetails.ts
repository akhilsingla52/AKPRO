export class ExamDetails {
    id: number;
    user_id: number;
    name: string;
    email: string;	
    category_id: number;
    attempt: number;
	right: number;
	marks: number;
	date: string;

    constructor(id: number, user_id: number, name: string, email: string, category_id: number, attempt: number, right: number, marks: number, date: string) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.email = email;	
        this.category_id = category_id;
        this.attempt = attempt;
        this.right = right;
        this.marks = marks;
        this.date = date;
    }
}