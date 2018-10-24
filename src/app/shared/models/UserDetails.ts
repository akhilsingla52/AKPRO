export class UserDetails {
    user_id: number;
    user_name: string;
    email: string;
    mobile: string;
    password: string;
	role: string;
	created_date: string;

    constructor(user_id: number, user_name: string, email: string, mobile: string, password:string, role: string, created_date: string) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.role = role;
        this.created_date = created_date;
    }
}