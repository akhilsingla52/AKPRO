import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Job } from '../../shared/models/Job';

@Injectable()
export class JobService {
 
    constructor(private http: HttpClient) { }

    getAllJobs() {
        return this.http.get(`job/allJobs`)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    getJobById(jobId) {
        return this.http.get(`job/`+jobId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    addJob(job: Job) {
        return this.http.post(`job/create`, job)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    updateJob(job: Job) {
        return this.http.put(`job/update`, job)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    deleteJobById(jobId) {
        return this.http.delete(`job/delete/`+jobId)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}