import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes }  from '@angular/router';

import { PageNotFoundComponent } from '../PageNotFound/pagenotfound.component';
import { HeaderComponent } from '../header/header.component';

import { MyHttpInterceptor } from '../httpInterceptor/MyHttpInterceptor';
import { MyHttpErrorHandler } from '../httpErrorHandler/MyHttpErrorHandler';
// import { AuthGuard } from '../../user-dashboard/authGuard/authguard.service';

const sharedRoutes: Routes = [
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(sharedRoutes, {useHash: true}) ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler, 
            useClass: MyHttpErrorHandler
        }
     ],
    exports: [ RouterModule ]
})

export class SharedRoutingModule { }

export const sharedComponents = [
    PageNotFoundComponent, HeaderComponent
];