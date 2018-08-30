(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      'app': 'app',
      '@angular/core':                      'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':                    'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http':               'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler':                  'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/forms':                     'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/platform-browser':          'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic':  'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router':                    'npm:@angular/router/bundles/router.umd.js',
      'core-js':                            'npm:core-js',
      'zone.js':                            'npm:zone.js',
      'rxjs':                               'npm:rxjs',
      'tslib':                              'npm:tslib/tslib.js',
      '@ng-bootstrap/ng-bootstrap':         'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
    },
    packages: {
      app: { 
        main: './main/main.js', 
        defaultExtension: 'js', 
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: { defaultExtension: 'js' }
    }
  });
})(this);