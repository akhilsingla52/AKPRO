export class Company {
    id: number;
    image_url: string;
    image_data: string;
    company_name: string;
	website: string;
	description: string;
	created_date: string;
	modified_date: string;

    constructor(id: number, image_url: string, image_data: string, company_name: string, website: string, description: string, created_date: string, modified_date: string) {
        this.id = id;
        this.image_url = image_url;
        this.image_data = image_data;
        this.company_name = company_name;
        this.website = website;
        this.description = description;
        this.created_date = created_date;
        this.modified_date = modified_date;
    }
}