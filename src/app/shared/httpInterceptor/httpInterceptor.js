"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var HttpInterceptor = /** @class */ (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    /**
     * For get request
     */
    HttpInterceptor.prototype.get = function (url, options) {
        return _super.prototype.get.call(this, this.getFullUrl(url), this.requestOptions(options))
            .catch(function (error, caught) {
            console.log('error in interceptor');
            return Observable_1.Observable.throw(error);
        }).do(function (res) {
            console.log('success interceptor');
        }, function (error) {
            console.log('error in interceptor');
        });
    };
    /**
     * For post request
     */
    HttpInterceptor.prototype.post = function (url, body, options) {
        return _super.prototype.post.call(this, this.getFullUrl(url), body, this.requestOptions(options))
            .catch(function (error, caught) {
            console.log('error in interceptor');
            return Observable_1.Observable.throw(error);
        }).do(function (res) {
            console.log('success interceptor');
        }, function (error) {
            console.log('error in interceptor');
        });
    };
    /**
     * For put request
     */
    HttpInterceptor.prototype.put = function (url, body, options) {
        return _super.prototype.put.call(this, this.getFullUrl(url), body, this.requestOptions(options))
            .catch(function (error, caught) {
            console.log('error in interceptor');
            return Observable_1.Observable.throw(error);
        }).do(function (res) {
            console.log('success interceptor');
        }, function (error) {
            console.log('error in interceptor');
        });
    };
    /**
    * For delete request
    */
    HttpInterceptor.prototype.delete = function (url, options) {
        return _super.prototype.delete.call(this, this.getFullUrl(url), this.requestOptions(options))
            .catch(function (error, caught) {
            console.log('error in interceptor');
            return Observable_1.Observable.throw(error);
        });
    };
    HttpInterceptor.prototype.getFullUrl = function (url) {
        //return 'http://localhost:3000' + url;
        return url;
    };
    HttpInterceptor.prototype.requestOptions = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            if (localStorage.getItem("admin") == "administrator") {
                options.headers = new http_1.Headers({
                    'userrole': JSON.parse(localStorage.getItem('userProfile')).role,
                    'flag': 1
                });
            }
            else {
                options.headers = new http_1.Headers({
                    'userrole': JSON.parse(localStorage.getItem('userProfile')).role,
                    'flag': 0
                });
            }
        }
        return options;
    };
    HttpInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.ConnectionBackend,
            http_1.RequestOptions])
    ], HttpInterceptor);
    return HttpInterceptor;
}(http_1.Http));
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=httpInterceptor.js.map