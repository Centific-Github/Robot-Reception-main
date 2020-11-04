System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appstates;
    return {
        setters: [],
        execute: function () {
            exports_1("appstates", appstates = [
                //#region test
                {
                    name: "account",
                    abstract: true,
                    url: "/account",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "account.index",
                    url: "/index",
                    templateUrl: "tpl/account/index.html",
                    controller: "AccountIndexCtrl"
                },
                {
                    name: "app",
                    abstract: true,
                    url: "/app",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "app.index",
                    url: "/index",
                    templateUrl: "tpl/app/index.html",
                    controller: "AppIndexCtrl"
                },
                {
                    name: "contact",
                    abstract: true,
                    url: "/contact",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "contact.index",
                    url: "/index",
                    templateUrl: "tpl/contact/index.html",
                    controller: "ContactIndexCtrl"
                },
                {
                    name: "visitreason",
                    abstract: true,
                    url: "/visitreason",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "visitreason.index",
                    url: "/index",
                    templateUrl: "tpl/visitreason/index.html",
                    controller: "VisitreasonIndexCtrl"
                },
                {
                    name: "visithistory",
                    abstract: true,
                    url: "/visithistory",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "visithistory.index",
                    url: "/index",
                    templateUrl: "tpl/visithistory/index.html",
                    controller: "VisithistoryIndexCtrl"
                },
                {
                    name: "deliver",
                    abstract: true,
                    url: "/deliver",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "deliver.index",
                    url: "/index",
                    templateUrl: "tpl/deliver/index.html",
                    controller: "DeliverIndexCtrl"
                },
                {
                    name: "interview",
                    abstract: true,
                    url: "/interview",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "interview.index",
                    url: "/index",
                    templateUrl: "tpl/interview/index.html",
                    controller: "InterviewIndexCtrl"
                },
                {
                    name: "onboard",
                    abstract: true,
                    url: "/onboard",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "onboard.index",
                    url: "/index",
                    templateUrl: "tpl/onboard/index.html",
                    controller: "OnboardIndexCtrl"
                },
                {
                    name: "position.index",
                    url: "/index",
                    templateUrl: "tpl/position/index.html",
                    controller: "PositionIndexCtrl"
                },
                {
                    name: "position.resumeIndex",
                    url: "/resumeIndex",
                    params: { id: null, fileName: null },
                    templateUrl: "tpl/position/resumeIndex.html",
                    controller: "ResumeIndexCtrl"
                },
                {
                    name: "sys",
                    abstract: true,
                    url: "/sys",
                    templateUrl: "tpl/layout.html"
                },
                {
                    name: "sys.dictionary",
                    url: "/dictionary",
                    templateUrl: "tpl/sys/dictionary.html",
                    controller: "SysDictionaryCtrl"
                },
            ]);
        }
    };
});
//# sourceMappingURL=states.js.map