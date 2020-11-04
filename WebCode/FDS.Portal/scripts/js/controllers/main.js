System.register(["../config", "./base", "../services/api"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var config_1, base_1, webapi, MainCtrl;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            }
        ],
        execute: function () {
            MainCtrl = /** @class */ (function (_super) {
                __extends(MainCtrl, _super);
                function MainCtrl($scope, $http, $q, $swal, $timeout, $state, principal, $rootScope, $uibModal, $location, $urlService, $i18next, $notify, api, desktopNotification, $interval) {
                    var _this = _super.call(this, $notify, $i18next, $scope) || this;
                    _this.$scope = $scope;
                    _this.$http = $http;
                    _this.$q = $q;
                    _this.$swal = $swal;
                    _this.$timeout = $timeout;
                    _this.$state = $state;
                    _this.principal = principal;
                    _this.$rootScope = $rootScope;
                    _this.$uibModal = $uibModal;
                    _this.$location = $location;
                    _this.$urlService = $urlService;
                    _this.$i18next = $i18next;
                    _this.$notify = $notify;
                    _this.api = api;
                    _this.desktopNotification = desktopNotification;
                    _this.$interval = $interval;
                    _this.init();
                    return _this;
                }
                MainCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        var scope_1, url, reg, r;
                        return __generator(this, function (_a) {
                            try {
                                scope_1 = this.$scope;
                                scope_1.entity = {};
                                scope_1.logout = this.logout.bind(this);
                                scope_1.login = this.login.bind(this);
                                scope_1.switchLanguage = this.switchLanguage.bind(this);
                                //await this.$timeout(1000);
                                //this.$cookies.put(100221, "asdssds");
                                //let cookies=this.$cookies.getAll();
                                scope_1.$on("zgh.setprincipal", function (event) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.principal.setInit();
                                        scope_1.isInited = this.principal.isInited();
                                        scope_1.$digest();
                                        return [2 /*return*/];
                                    });
                                }); });
                                this.principal.setInit();
                                scope_1.isInited = this.principal.isInited();
                                //scope.$digest();
                                //this.loginSso("asf");
                                if (location.href.indexOf("isCasIframe=1") != -1) {
                                    return [2 /*return*/];
                                }
                                url = window.location.href;
                                if (!(url.indexOf("/?ticket=") != -1)) {
                                    this.toAuth();
                                    return [2 /*return*/];
                                }
                                reg = new RegExp("(^|&)ticket=([^&]*)(&|$)", "i");
                                r = location.search.substr(1).match(reg);
                                if (r != null) {
                                    scope_1.ticket = unescape(r[2]).toString();
                                    this.loginSso(scope_1.ticket);
                                }
                                else {
                                    this.toAuth();
                                    return [2 /*return*/];
                                }
                            }
                            catch (err) {
                                console.error(err);
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                MainCtrl.prototype.toAuth = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            location.href = config_1.default.casLoginUrl + "?service=" + config_1.default.sysDomain;
                            return [2 /*return*/];
                        });
                    });
                };
                MainCtrl.prototype.logout = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.principal.logout();
                            location.href = config_1.default.casServerUrl + "/logout?service=" + config_1.default.sysDomain;
                            return [2 /*return*/];
                        });
                    });
                };
                MainCtrl.prototype.loginSso = function (ticket) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, entity, userTiketVM, webUsersClient, userTiketVM_1, user, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    entity = scope.entity;
                                    userTiketVM = scope.userTiketVM;
                                    entity.isLoading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    webUsersClient = this.api.getClient(webapi.WebUsersClient);
                                    userTiketVM_1 = this.api.getClient(webapi.UserTiketVM);
                                    userTiketVM_1.serviceTicket = ticket;
                                    userTiketVM_1.serviceUrl = config_1.default.sysDomain;
                                    return [4 /*yield*/, webUsersClient.loginSso(userTiketVM_1)];
                                case 2:
                                    user = _a.sent();
                                    if (user) {
                                        this.principal.setIdentity(user);
                                        this.$state.go("account.index");
                                        scope.isLogin = true;
                                    }
                                    else {
                                        this.logout();
                                    }
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_1 = _a.sent();
                                    this.processErrorResponse(err_1);
                                    return [3 /*break*/, 5];
                                case 4:
                                    entity.isLoading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                MainCtrl.prototype.getTicket = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var reg, r;
                        return __generator(this, function (_a) {
                            reg = new RegExp("(^|&)ticket=([^&]*)(&|$)", "i");
                            r = location.search.substr(1).match(reg);
                            if (r != null)
                                return [2 /*return*/, unescape(r[2]).toString()];
                            return [2 /*return*/, null];
                        });
                    });
                };
                MainCtrl.prototype.login = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, entity, client, user, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    entity = scope.entity;
                                    entity.isLoading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    client = this.api.getClient(webapi.WebUsersClient);
                                    return [4 /*yield*/, client.login(entity.userName, entity.password)];
                                case 2:
                                    user = _a.sent();
                                    this.principal.setIdentity(user);
                                    this.$state.go("account.index");
                                    scope.isLogin = true;
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_2 = _a.sent();
                                    this.processErrorResponse(err_2);
                                    return [3 /*break*/, 5];
                                case 4:
                                    entity.isLoading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                MainCtrl.prototype.switchLanguage = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var lng;
                        return __generator(this, function (_a) {
                            console.log(this.$i18next);
                            lng = this.$i18next.i18n.language;
                            if (lng == "zh-CN") {
                                lng = "en";
                            }
                            else {
                                lng = "zh-CN";
                            }
                            this.$i18next.changeLanguage(lng);
                            return [2 /*return*/];
                        });
                    });
                };
                MainCtrl.prototype.desktopNotificationCheck = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        var promise;
                        return __generator(this, function (_a) {
                            promise = new Promise(function (resolve, reject) {
                                if (!_this.desktopNotification.isSupported()) {
                                    _this.$notify.warn("当前浏览器不支持桌面提醒功能");
                                    resolve(false);
                                }
                                else {
                                    if (_this.desktopNotification.currentPermission() == "default") {
                                        _this.desktopNotification.requestPermission().then(function (permission) {
                                            _this.$notify.success("成功启用桌面提醒功能");
                                            resolve(true);
                                        }, function (permission) {
                                            _this.$notify.warn("您禁用了桌面提醒功能,将不能及时的获得报警等提醒");
                                            resolve(false);
                                        });
                                    }
                                }
                            });
                            return [2 /*return*/, promise];
                        });
                    });
                };
                return MainCtrl;
            }(base_1.default));
            exports_1("MainCtrl", MainCtrl);
        }
    };
});
//# sourceMappingURL=main.js.map