import "./module";
import moment from "moment";
import ng from "angular";
import * as uiRouter from "angular-ui-router";
import angularDragula from "angularjs-dragula";
import appcontroller from "./controllers/module";
import appservice from "./services/index";
import appfilter from "./filters/index";
import appdirectives from "./directives/index";
import { appstates } from "./states";
import $ from "jquery";

ng.module("app", [appcontroller, appservice, appfilter, appdirectives, "ui.router", "ui.select",
    "angular-loading-bar", "ngAnimate", "ngSanitize", "ngMessages", "ui.bootstrap", "ui.tinymce",
    "ui.bootstrap.datetimepicker", "ngNotify", "ngFileUpload", "jm.i18next", angularDragula(ng),
    "sticky", "colorpicker.module", "chart.js", "ngDesktopNotification"])
    .config(["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider", "$logProvider",
        "$animateProvider", "desktopNotificationProvider",
        ($stateProvider: uiRouter.StateProvider, $urlRouterProvider, cfpLoadingBarProvider,
            $logProvider: ng.ILogProvider, $animateProvider: ng.animate.IAnimateProvider,
            desktopNotificationProvider) => {
            if (window["i18next"]) {
                window["i18next"].use(window["i18nextSprintfPostProcessor"])
                window["i18next"].use(window["i18nextXHRBackend"]);
                window["i18next"].use(window["i18nextBrowserLanguageDetector"]);
                window["i18next"].init({
                    debug: false,
                    //lng: 'en', // If not given, i18n will detect the browser language.
                    fallbackLng: false, // Default is dev
                    backend: {
                        loadPath: '/locales/{{lng}}.json'
                    },
                }, function (err, t) {
                    console.log('resources loaded');
                });
            }

            moment.locale("zh-CN");

            $animateProvider.classNameFilter(/^((?!(fa-spinner)).)*$/)

            cfpLoadingBarProvider.includeSpinner = false;
            //cfpLoadingBarProvider.latencyThreshold =  500;

            desktopNotificationProvider.config({
                autoClose: false,
                showOnPageHidden: false,
            });

            $urlRouterProvider.otherwise("/visithistory/index");

            appstates.forEach(state => $stateProvider.state(state));
        }
    ])
    .run(["$rootScope", "$state", "$transitions", "principal",
        async ($rootScope: ng.IRootScopeService,
            $state: uiRouter.StateService,
            $transitions: uiRouter.TransitionService,
            $dict, principal) => {

            //$transitions.onBefore({
            //    to: (state) => state.name !== "splash"
            //}, (transition) => {
            //    let principal: any = transition.injector().get("principal");
            //    let $state: any = transition.router.stateService;
            //    if (!principal.isInited()) {
            //        return $state.target("splash", undefined, { location: false });
            //    }
            //}, { priority: 10 });

            //$transitions.onBefore({
            //    to: (state) => state.data && state.data.requiresAuth
            //}, (transition) => {
            //    let principal: any = transition.injector().get("principal");
            //    let $state: any = transition.router.stateService;
            //    if (!principal.isAuthenticated()) {
            //        //return $state.target("login.index", undefined, { location: false });
            //    }
            //}, { priority: 10 });
        }
    ])
    ;