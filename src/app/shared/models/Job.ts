export class Job {
    id: number;
    company_id: number;
    company_name: string;
    location: string;
    technology: string;
	role: string;
	experience: string;
	salary: number;
	created_date: string;
	modified_date: string;

    constructor(id: number, company_id: number, company_name: string, location: string, technology: string, role: string, experience: string, salary:number, created_date: string, modified_date: string) {
        this.id = id;
        this.company_id = company_id;
        this.company_name = company_name;
        this.location = location;
        this.technology = technology;
        this.role = role;
        this.experience = experience;
        this.salary = salary;
        this.created_date = created_date;
        this.modified_date = modified_date;
    }
}