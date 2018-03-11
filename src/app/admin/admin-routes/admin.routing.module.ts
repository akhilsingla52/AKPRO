import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { XHRBackend, RequestOptions } from '@angular/http';

import { LoginComponent } from '../login/login.component';

import { LoginService } from '../login/login.service';

const adminRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(adminRoutes) ],
    providers: [ 
        LoginService
     ],
    exports: [ RouterModule ]
})

export class AdminRoutingModule { }

export const adminComponents = [
    LoginComponent
];