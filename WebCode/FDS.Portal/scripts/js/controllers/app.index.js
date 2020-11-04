System.register(["./base", "../services/api"], function (exports_1, context_1) {
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
    var base_1, webapi, AppIndexCtrl;
    return {
        setters: [
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            }
        ],
        execute: function () {
            AppIndexCtrl = /** @class */ (function (_super) {
                __extends(AppIndexCtrl, _super);
                function AppIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
                    var _this = _super.call(this, $notify, $i18next, $scope) || this;
                    _this.$scope = $scope;
                    _this.$http = $http;
                    _this.$q = $q;
                    _this.$swal = $swal;
                    _this.$timeout = $timeout;
                    _this.$state = $state;
                    _this.$stateParams = $stateParams;
                    _this.principal = principal;
                    _this.$rootScope = $rootScope;
                    _this.$uibModal = $uibModal;
                    _this.$location = $location;
                    _this.$urlService = $urlService;
                    _this.$notify = $notify;
                    _this.$i18next = $i18next;
                    _this.api = api;
                    _this.validateFileSize = validateFileSize;
                    _this.Upload = Upload;
                    _this.init();
                    return _this;
                }
                AppIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            scope.appAuth = {};
                            scope.pageInit = this.pageInit.bind(this);
                            this.pageInit();
                            scope.close = function () {
                                //this.$uibModalInstance.dismiss("dismiss");
                            };
                            scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                var webAppAuthClient, appAuthVM, resp, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            if (scope.appAuth.authKey === undefined) {
                                                this.$swal.error({ title: "请填写App Auth Key!" });
                                                return [2 /*return*/];
                                            }
                                            if (scope.appAuth.psw === undefined) {
                                                this.$swal.error({ title: "请填写App Update Password!" });
                                                return [2 /*return*/];
                                            }
                                            webAppAuthClient = this.api.getClient(webapi.WebAppAuthClient);
                                            appAuthVM = this.api.getClient(webapi.AppAuthVM);
                                            appAuthVM.authKey = scope.appAuth.authKey;
                                            appAuthVM.psw = scope.appAuth.psw;
                                            return [4 /*yield*/, webAppAuthClient.upateAppAuth(appAuthVM)];
                                        case 1:
                                            resp = _a.sent();
                                            if (resp.errcode === 0) {
                                                this.pageInit();
                                                this.$notify.success("Update successful!");
                                                //$uibModalInstance.close();
                                            }
                                            else {
                                                this.$swal.error({ title: resp.errmsg });
                                                //$uibModalInstance.close();
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            err_1 = _a.sent();
                                            console.error(err_1);
                                            this.$swal.error({ title: "Update exception, please contact administrator!" });
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [2 /*return*/];
                        });
                    });
                };
                // #region 初始化数据
                AppIndexCtrl.prototype.pageInit = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, appAuth, query_1, webAppAuthClient, dataSource, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    query = scope.query;
                                    appAuth = scope.appAuth;
                                    query.loading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    query_1 = scope.query;
                                    webAppAuthClient = this.api.getClient(webapi.WebAppAuthClient);
                                    return [4 /*yield*/, webAppAuthClient.getAppAuth()];
                                case 2:
                                    dataSource = _a.sent();
                                    appAuth.authKey = dataSource.data.authKey;
                                    appAuth.psw = dataSource.data.psw;
                                    query_1.loading = false;
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    this.$notify.error("Failed initialization");
                                    return [3 /*break*/, 5];
                                case 4:
                                    query.loading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                return AppIndexCtrl;
            }(base_1.default));
            exports_1("AppIndexCtrl", AppIndexCtrl);
        }
    };
});
//# sourceMappingURL=app.index.js.map