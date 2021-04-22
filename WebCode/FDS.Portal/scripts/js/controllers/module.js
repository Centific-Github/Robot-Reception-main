System.register(["angular", "./main", "./test.index", "./position.index", "./sys.dictionary", "./position.resumeIndex", "./account.index", "./app.index", "./contact.index", "./visitreason.index", "./visithistory.index", "./deliver.index", "./interview.index", "./onboard.index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular_1, main_1, test_index_1, position_index_1, sys_dictionary_1, position_resumeIndex_1, account_index_1, app_index_1, contact_index_1, visitreason_index_1, visithistory_index_1, deliver_index_1, interview_index_1, onboard_index_1, appcontroller;
    return {
        setters: [
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (test_index_1_1) {
                test_index_1 = test_index_1_1;
            },
            function (position_index_1_1) {
                position_index_1 = position_index_1_1;
            },
            function (sys_dictionary_1_1) {
                sys_dictionary_1 = sys_dictionary_1_1;
            },
            function (position_resumeIndex_1_1) {
                position_resumeIndex_1 = position_resumeIndex_1_1;
            },
            function (account_index_1_1) {
                account_index_1 = account_index_1_1;
            },
            function (app_index_1_1) {
                app_index_1 = app_index_1_1;
            },
            function (contact_index_1_1) {
                contact_index_1 = contact_index_1_1;
            },
            function (visitreason_index_1_1) {
                visitreason_index_1 = visitreason_index_1_1;
            },
            function (visithistory_index_1_1) {
                visithistory_index_1 = visithistory_index_1_1;
            },
            function (deliver_index_1_1) {
                deliver_index_1 = deliver_index_1_1;
            },
            function (interview_index_1_1) {
                interview_index_1 = interview_index_1_1;
            },
            function (onboard_index_1_1) {
                onboard_index_1 = onboard_index_1_1;
            }
        ],
        execute: function () {
            appcontroller = "app.controller";
            exports_1("default", appcontroller);
            angular_1.default.module(appcontroller, [])
                .controller("MainCtrl", main_1.MainCtrl)
                .controller("TestIndexCtrl", test_index_1.TestIndexCtrl)
                .controller("PositionIndexCtrl", position_index_1.PositionIndexCtrl)
                .controller("SysDictionaryCtrl", sys_dictionary_1.SysDictionaryCtrl)
                .controller("ResumeIndexCtrl", position_resumeIndex_1.ResumeIndexCtrl)
                .controller("AccountIndexCtrl", account_index_1.AccountIndexCtrl)
                .controller("AppIndexCtrl", app_index_1.AppIndexCtrl)
                .controller("ContactIndexCtrl", contact_index_1.ContactIndexCtrl)
                .controller("VisitreasonIndexCtrl", visitreason_index_1.VisitreasonIndexCtrl)
                .controller("VisithistoryIndexCtrl", visithistory_index_1.VisithistoryIndexCtrl)
                .controller("DeliverIndexCtrl", deliver_index_1.DeliverIndexCtrl)
                .controller("InterviewIndexCtrl", interview_index_1.InterviewIndexCtrl)
                .controller("OnboardIndexCtrl", onboard_index_1.OnboardIndexCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map