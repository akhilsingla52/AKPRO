import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CategoryComponent } from '../category/category.component';
import { CompanyComponent } from '../company/company.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { JobComponent } from '../job/job.component';
import { LoginComponent } from '../login/login.component';
import { QuestionComponent } from '../question/question.component';
import { TestComponent } from '../test/test.component';
import { UserComponent } from '../user/user.component';
import { WelcomeComponent } from '../welcome/welcome.component';

import { CategoryService } from '../category/category.service';
import { CompanyService } from '../company/company.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { JobService } from '../job/job.service';
import { LoginService } from '../login/login.service';
import { QuestionService } from '../question/question.service';
import { TestService } from '../test/test.service';
import { UserService } from '../user/user.service';

const adminRoutes: Routes = [
    { path: 'admin', component: WelcomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'company', component: CompanyComponent },
            { path: 'job', component: JobComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'question', component: QuestionComponent },
            { path: 'users', component: UserComponent },
            { path: 'test', component: TestComponent },
        ]
    },
    {   path: 'login',  component: LoginComponent   },
    {   path: '',   redirectTo: '/login',   pathMatch: 'full'   },
];


@NgModule({
    imports: [ RouterModule.forRoot(adminRoutes, {useHash: true}) ],
    providers: [ 
        CategoryService, 
        CompanyService, 
        DashboardService, 
        JobService, 
        LoginService, 
        QuestionService, 
        TestService, 
        UserService
     ],
    exports: [ RouterModule ]
})

export class AdminRoutingModule { }

export const adminComponents = [
    CategoryComponent,
    CompanyComponent,
    DashboardComponent,
    JobComponent,
    LoginComponent,
    QuestionComponent,
    TestComponent,
    UserComponent,
    WelcomeComponent
];