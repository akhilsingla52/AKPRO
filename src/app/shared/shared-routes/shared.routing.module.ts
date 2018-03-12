import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { XHRBackend, RequestOptions } from '@angular/http';

import { PageNotFoundComponent } from '../PageNotFound/pagenotfound.component';
import { HttpInterceptor } from '../httpInterceptor/httpInterceptor';
// import { AuthGuard } from '../../user-dashboard/authGuard/authguard.service';

const sharedRoutes: Routes = [
    {
        path: '**',
        component: PageNotFoundComponent
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(sharedRoutes, {useHash: true}) ],
    providers: [
        {
            provide: HttpInterceptor,
            useFactory:
            (backend: XHRBackend, defaultOptions: RequestOptions) => {
                return new HttpInterceptor(backend, defaultOptions);
            },
            deps: [XHRBackend, RequestOptions]
        }
     ],
    exports: [ RouterModule ]
})

export class SharedRoutingModule { }

export const sharedComponents = [
    PageNotFoundComponent
];