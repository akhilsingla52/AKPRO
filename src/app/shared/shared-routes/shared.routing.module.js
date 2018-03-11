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
var http_1 = require("@angular/http");
var pagenotfound_component_1 = require("../PageNotFound/pagenotfound.component");
var httpInterceptor_1 = require("../httpInterceptor/httpInterceptor");
// import { AuthGuard } from '../../user-dashboard/authGuard/authguard.service';
var sharedRoutes = [
    {
        path: '**',
        component: pagenotfound_component_1.PageNotFoundComponent
    }
];
var SharedRoutingModule = /** @class */ (function () {
    function SharedRoutingModule() {
    }
    SharedRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(sharedRoutes)],
            providers: [
                {
                    provide: httpInterceptor_1.HttpInterceptor,
                    useFactory: function (backend, defaultOptions) {
                        return new httpInterceptor_1.HttpInterceptor(backend, defaultOptions);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                }
            ],
            exports: [router_1.RouterModule]
        })
    ], SharedRoutingModule);
    return SharedRoutingModule;
}());
exports.SharedRoutingModule = SharedRoutingModule;
exports.sharedComponents = [
    pagenotfound_component_1.PageNotFoundComponent
];
//# sourceMappingURL=shared.routing.module.js.map