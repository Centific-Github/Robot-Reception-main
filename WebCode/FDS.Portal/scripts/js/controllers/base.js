System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BaseCtrl;
    return {
        setters: [],
        execute: function () {
            BaseCtrl = /** @class */ (function () {
                function BaseCtrl(notify, i18next, scope) {
                    var _this = this;
                    this.$$notify = notify;
                    this.$$i18next = i18next;
                    this.lng = i18next.i18n.language;
                    scope.lng = this.lng;
                    scope.$on("i18nextLanguageChange", function () {
                        scope.lng = _this.lng = _this.$$i18next.i18n.language;
                        if (!scope.$$phase) {
                            scope.$digest();
                        }
                    });
                }
                BaseCtrl.prototype.processErrorResponse = function (err) {
                    if (err.status === 400) {
                        if (err.response) {
                            var msg = JSON.parse(err.response);
                            if (typeof msg === "object") {
                                msg.message && this.$$notify.warn(this.$$i18next.t(msg.message));
                            }
                            else {
                                console.error(err);
                                this.$$notify.warn(this.$$i18next.t("actionFailure"));
                            }
                        }
                        else if (!err.response) {
                            console.error(err);
                            this.$$notify.warn(this.$$i18next.t("actionFailure"));
                        }
                    }
                    else if (err.status === 500 || err.status === 404 || err.status === -1) {
                        console.error(err);
                        this.$$notify.error(this.$$i18next.t("remoteServerException"));
                    }
                    else if (err.status === 401) {
                        this.$$notify.warn(this.$$i18next.t("noPermissionToAccess"));
                    }
                    else {
                        console.error(err);
                    }
                };
                return BaseCtrl;
            }());
            exports_1("default", BaseCtrl);
        }
    };
});
//# sourceMappingURL=base.js.map