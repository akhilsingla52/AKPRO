export class Category {
    id: number;
    category_name: string;
	created_date: string;
	modified_date: string;

    constructor(id: number, category_name: string, created_date: string, modified_date: string) {
        this.id = id;
        this.category_name = category_name;
        this.created_date = created_date;
        this.modified_date = modified_date;
    }
}