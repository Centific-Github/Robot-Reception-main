SystemJS.config({
    packages: {
        ".": {
            defaultExtension: "js",
            meta: {}
        }
    },
    paths: {
        'npm:': 'node_modules/'
    },
    map: {
        jquery: "npm:jquery/dist/jquery.min.js",
        angular: "npm:angular/angular.min.js",
        "@uirouter/core": "npm:@uirouter/core/_bundles/ui-router-core.min.js",
        "angular-ui-router": "npm:angular-ui-router/release/angular-ui-router.min.js",
        lodash: "npm:lodash/lodash.min.js",
        tether: "npm:tether/dist/js/tether.min.js",
        bs3: "libs/bs3/dist/toolkit.min.js",
        less: "npm:less/dist/less.min.js",
        "chart": "npm:chart.js/dist/Chart.min.js",
        loadingbar: "npm:angular-loading-bar/build/loading-bar.min.js",
        "angular-ui-bootstrap": "npm:angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "angular-animate": "npm:angular-animate/angular-animate.min.js",
        "angular-sanitize": "npm:angular-sanitize/angular-sanitize.min.js",
        sweetalert2: "npm:sweetalert2/dist/sweetalert2.min.js",
        "moment": "npm:moment/min/moment-with-locales.min.js",
        "angular-bootstrap-datetimepicker": "npm:angular-bootstrap-datetimepicker/src/js/datetimepicker.js",
        "angular-bootstrap-datetimepicker-template": "npm:angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js",
        "ui-select": "npm:ui-select/dist/select.min.js",
        "angular-message": "npm:angular-messages/angular-messages.min.js",
        "ng-notify": "npm:ng-notify/dist/ng-notify.min.js",
        "ng-file-upload": "npm:ng-file-upload/dist/ng-file-upload-all.min.js",
        "angular-i18n": "npm:angular-i18n/angular-locale_zh.js",
        "ng-i18next": "npm:ng-i18next/dist/ng-i18next.js",
        "angular-ui-tinymce": "npm:angular-ui-tinymce/dist/tinymce.min.js",
        "angularjs-dragula": "npm:angularjs-dragula/dist/angularjs-dragula.min.js",
        "sticky": "npm:ngsticky/dist/sticky.min.js",
        "angular-bootstrap-colorpicker": "npm:angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js",
        "angular-chart.js": "npm:angular-chart.js/dist/angular-chart.js",
        "angular-desktop-notification": "npm:angular-desktop-notification/dist/angular-desktop-notification.min.js",
    },
    meta: {
        "npm:moment/min/moment-with-locales.min.js": {
            format: 'global'
        }
    }
});
//# sourceMappingURL=sysconfig.js.map