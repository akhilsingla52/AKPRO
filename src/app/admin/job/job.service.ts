import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Job } from '../../shared/models/Job';

@Injectable()
export class JobService {
 
    constructor(private http: HttpClient) { }

    getAllJobs() {
        return this.http.get<any>(`job/getAll`)
            .pipe( map( res => res ) );
    }

    getJobById(jobId) {
        return this.http.get<any>(`job/`+jobId)
            .pipe( map( res => res ) );
    }

    addJob(job: Job) {
        return this.http.post<any>(`job/create`, job)
            .pipe( map( res => res ) );
    }

    updateJob(job: Job) {
        return this.http.put<any>(`job/update`, job)
            .pipe( map( res => res ) );
    }

    deleteJobById(jobId) {
        return this.http.delete<any>(`job/delete/`+jobId)
            .pipe( map( res => res ) );
    }
    
}