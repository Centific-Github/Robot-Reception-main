System.register(["angular", "../config", "sweetalert2", "../services/api.config"], function (exports_1, context_1) {
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
    var _this, angular_1, config_1, sweetalert2_1, api_config_1, appservices;
    return {
        setters: [
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (sweetalert2_1_1) {
                sweetalert2_1 = sweetalert2_1_1;
            },
            function (api_config_1_1) {
                api_config_1 = api_config_1_1;
            }
        ],
        execute: function () {
            appservices = "app.services";
            exports_1("default", appservices);
            angular_1.default.module(appservices, [])
                .factory("principal", ["$http", "$q", "$notify", "$timeout", "$rootScope",
                function ($http, $q, $notify, $timeout, $rootScope) {
                    var setIdentity = function (token) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    localStorage.setItem("useraccount", token.account);
                                    localStorage.setItem("userid", token.id);
                                    localStorage.setItem("username", token.name);
                                    localStorage.setItem("userrole", token.role);
                                    return [4 /*yield*/, $timeout(1000)];
                                case 1:
                                    _a.sent();
                                    $rootScope.$broadcast("zgh.setprincipal");
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    var check = function () {
                        return !!localStorage.getItem("userid");
                    };
                    var getId = function () {
                        var userId = localStorage.getItem("userid");
                        return userId;
                    };
                    var getAccount = function () {
                        var account = localStorage.getItem("useraccount");
                        return account;
                    };
                    var getRole = function () {
                        var role = localStorage.getItem("userrole");
                        return role;
                    };
                    var getName = function () {
                        var name = localStorage.getItem("username");
                        return name;
                    };
                    var isInit = false;
                    var isInited = function () { return isInit; };
                    var setInit = function () {
                        isInit = true;
                    };
                    var logout = function () {
                        localStorage.clear();
                    };
                    return {
                        setIdentity: setIdentity,
                        id: getId,
                        account: getAccount,
                        role: getRole,
                        name: getName,
                        isAuthenticated: function () { return !!sessionStorage.getItem("userid"); },
                        setInit: setInit,
                        isInited: isInited,
                        check: check,
                        logout: logout,
                    };
                }
            ])
                .factory("api", ["$http", "$q", "principal",
                function ($http, $q, principal) {
                    function createInstance(c) {
                        var configBase = new api_config_1.ConfigBase();
                        configBase.q = $q;
                        return new c(configBase, $http, $q, config_1.default.webapi);
                    }
                    return {
                        getClient: createInstance,
                    };
                }
            ])
                .factory("$swal", ["$http", "$q",
                function () {
                    var success = function (title, text, config) {
                        if (angular_1.default.isObject(title)) {
                            config = title;
                        }
                        else {
                            config = config || {};
                            config.title = title;
                            config.text = text;
                        }
                        sweetalert2_1.default({
                            title: config.title,
                            text: config.text,
                            type: "success",
                            timer: config.timer,
                            allowOutsideClick: config.allowOutsideClick,
                        }).catch(sweetalert2_1.default.noop);
                    };
                    var error = function (title, text, config) {
                        if (angular_1.default.isObject(title)) {
                            config = title;
                        }
                        else {
                            config = config || {};
                            config.title = title;
                            config.text = text;
                        }
                        sweetalert2_1.default({
                            title: config.title,
                            text: config.text,
                            type: "error",
                            timer: config.timer,
                            allowOutsideClick: config.allowOutsideClick,
                        }).catch(sweetalert2_1.default.noop);
                    };
                    var warning = function (title, text, config) {
                        if (angular_1.default.isObject(title)) {
                            config = title;
                        }
                        else {
                            config = config || {};
                            config.title = title;
                            config.text = text;
                        }
                        sweetalert2_1.default({
                            title: config.title,
                            text: config.text,
                            type: "warning",
                            timer: config.timer,
                            allowOutsideClick: config.allowOutsideClick,
                        }).catch(sweetalert2_1.default.noop);
                    };
                    var info = function (title, text, config) {
                        if (angular_1.default.isObject(title)) {
                            config = title;
                        }
                        else {
                            config = config || {};
                            config.title = title;
                            config.text = text;
                        }
                        sweetalert2_1.default({
                            title: config.title,
                            text: config.text,
                            type: "info",
                            timer: config.timer,
                            allowOutsideClick: config.allowOutsideClick,
                        }).catch(sweetalert2_1.default.noop);
                    };
                    var question = function (title, text, config) {
                        if (angular_1.default.isObject(title)) {
                            config = title;
                        }
                        else {
                            config = config || {};
                            config.title = title;
                            config.text = text;
                        }
                        sweetalert2_1.default({
                            title: config.title,
                            text: config.text,
                            type: "question",
                            timer: config.timer,
                            allowOutsideClick: config.allowOutsideClick,
                        }).catch(sweetalert2_1.default.noop);
                    };
                    var confirm = function (title, text, config) {
                        if (angular_1.default.isObject(title)) {
                            config = title;
                        }
                        else {
                            config = config || {};
                            config.title = title;
                            config.text = text;
                        }
                        return sweetalert2_1.default({
                            title: config.title,
                            text: config.text,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#8c8c8c",
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            allowOutsideClick: false,
                            showLoaderOnConfirm: !!config.preConfirm,
                            preConfirm: config.preConfirm,
                        });
                    };
                    var close = function () {
                        sweetalert2_1.default.close();
                    };
                    return {
                        success: success,
                        error: error,
                        warning: warning,
                        info: info,
                        question: question,
                        confirm: confirm,
                        close: close,
                        instance: sweetalert2_1.default,
                    };
                }
            ])
                .factory("$notify", ['ngNotify',
                function (ngNotify) {
                    var info = function (title, config) {
                        config = config || {};
                        ngNotify.set(title, { type: "info", duration: config.timer || 3000 });
                    };
                    var error = function (title, config) {
                        config = config || {};
                        ngNotify.set(title, { type: "error", duration: config.timer || 3000 });
                    };
                    var success = function (title, config) {
                        config = config || {};
                        ngNotify.set(title, { type: "success", duration: config.timer || 3000 });
                    };
                    var warn = function (title, config) {
                        config = config || {};
                        ngNotify.set(title, { type: "warn", duration: config.timer || 3000 });
                    };
                    var grimace = function (title, config) {
                        config = config || {};
                        ngNotify.set(title, { type: "grimace", duration: config.timer || 3000 });
                    };
                    return {
                        info: info,
                        error: error,
                        success: success,
                        warn: warn,
                        grimace: grimace,
                    };
                }
            ])
                .factory("validateFileSize", ["$notify",
                function ($notify) {
                    return function (file, size) {
                        if (file.size > size) {
                            $notify.warn("\u5BFC\u5165\u7684\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7" + size / 1024 / 1024 + "M");
                            return false;
                        }
                        return true;
                    };
                }
            ])
                .factory("tinymce", ["$i18next", "$uibModal",
                function ($i18next, $uibModal) {
                    var init = function (scope) {
                        scope.tinymceOption = config_1.default.tinymceBaseConfig;
                        //scope.tinymceOption.setup = (editor) => {
                        //    editor.addButton("mygallery", {
                        //        text: $i18next.t("common.resourceLibrary"),
                        //        icon: false,
                        //        onclick: function () {
                        //            $uibModal.open({
                        //                templateUrl: "../../tpl/modal/resource.pick.html",
                        //                controller: ResourcePickCtrl,
                        //                resolve: {
                        //                },
                        //                size: "lg"
                        //            }).result.then((resource) => {
                        //                if (resource.fileType === enums.fileType.image.value) {
                        //                    editor.insertContent(`<img src="${resource.fileUrlCn}" alt=""/>`);
                        //                } else if (resource.fileType === enums.fileType.video.value) {
                        //                    editor.insertContent(`<video src="${resource.fileUrlCn}"/>`);
                        //                }
                        //            }).catch(() => { });
                        //        }
                        //    });
                        //}
                    };
                    return {
                        init: init,
                    };
                }
            ]);
        }
    };
});
//# sourceMappingURL=index.js.map