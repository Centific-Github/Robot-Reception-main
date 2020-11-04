System.register(["./module", "moment", "angular", "angularjs-dragula", "./controllers/module", "./services/index", "./filters/index", "./directives/index", "./states"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    _this = this;
    var __moduleName = context_1 && context_1.id;
    var _this, moment_1, angular_1, angularjs_dragula_1, module_1, index_1, index_2, index_3, states_1;
    return {
        setters: [
            function (_1) {
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (angularjs_dragula_1_1) {
                angularjs_dragula_1 = angularjs_dragula_1_1;
            },
            function (module_1_1) {
                module_1 = module_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (states_1_1) {
                states_1 = states_1_1;
            }
        ],
        execute: function () {
            angular_1.default.module("app", [module_1.default, index_1.default, index_2.default, index_3.default, "ui.router", "ui.select",
                "angular-loading-bar", "ngAnimate", "ngSanitize", "ngMessages", "ui.bootstrap", "ui.tinymce",
                "ui.bootstrap.datetimepicker", "ngNotify", "ngFileUpload", "jm.i18next", angularjs_dragula_1.default(angular_1.default),
                "sticky", "colorpicker.module", "chart.js", "ngDesktopNotification"])
                .config(["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider", "$logProvider",
                "$animateProvider", "desktopNotificationProvider",
                function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $logProvider, $animateProvider, desktopNotificationProvider) {
                    if (window["i18next"]) {
                        window["i18next"].use(window["i18nextSprintfPostProcessor"]);
                        window["i18next"].use(window["i18nextXHRBackend"]);
                        window["i18next"].use(window["i18nextBrowserLanguageDetector"]);
                        window["i18next"].init({
                            debug: false,
                            //lng: 'en', // If not given, i18n will detect the browser language.
                            fallbackLng: false,
                            backend: {
                                loadPath: '/locales/{{lng}}.json'
                            },
                        }, function (err, t) {
                            console.log('resources loaded');
                        });
                    }
                    moment_1.default.locale("zh-CN");
                    $animateProvider.classNameFilter(/^((?!(fa-spinner)).)*$/);
                    cfpLoadingBarProvider.includeSpinner = false;
                    //cfpLoadingBarProvider.latencyThreshold =  500;
                    desktopNotificationProvider.config({
                        autoClose: false,
                        showOnPageHidden: false,
                    });
                    $urlRouterProvider.otherwise("/visithistory/index");
                    states_1.appstates.forEach(function (state) { return $stateProvider.state(state); });
                }
            ])
                .run(["$rootScope", "$state", "$transitions", "principal",
                function ($rootScope, $state, $transitions, $dict, principal) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); }
            ]);
        }
    };
});
//# sourceMappingURL=app.js.map