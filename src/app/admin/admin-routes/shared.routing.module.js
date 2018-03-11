"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import { AboutComponent } from '../about/about.component';
// import { JumbotronService } from '../jumbotron/jumbotron.service';
// import { HttpInterceptor } from '../httpInterceptor/httpInterceptor';
// import { AuthGuard } from '../../user-dashboard/authGuard/authguard.service';
var sharedRoutes = [];
var SharedRoutingModule = /** @class */ (function () {
    function SharedRoutingModule() {
    }
    SharedRoutingModule = __decorate([
        core_1.NgModule({
            // imports: [ RouterModule.forRoot(sharedRoutes) ],
            // providers: [ 
            //     AuthGuard, JumbotronService, UserLoginService, UserRegistrationService,
            //     {
            //         provide: HttpInterceptor,
            //         useFactory:
            //         (backend: XHRBackend, defaultOptions: RequestOptions) => {
            //             return new HttpInterceptor(backend, defaultOptions);
            //         },
            //         deps: [XHRBackend, RequestOptions]
            //     }
            //  ],
            exports: [router_1.RouterModule]
        })
    ], SharedRoutingModule);
    return SharedRoutingModule;
}());
exports.SharedRoutingModule = SharedRoutingModule;
// export const sharedComponents = [
//     AboutComponent, AppFooter, GoogleAuth,JumbotronComponent,PageNotFoundComponent,
//     UserLoginComponent, UserRegistrationComponent, SearchFilterPipe,FileSelectDirective,FileDropDirective
// ]; 
//# sourceMappingURL=shared.routing.module.js.map