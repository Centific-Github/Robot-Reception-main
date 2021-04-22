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
    var config_1, base_1, webapi, DeliverIndexCtrl;
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
            DeliverIndexCtrl = /** @class */ (function (_super) {
                __extends(DeliverIndexCtrl, _super);
                function DeliverIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
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
                DeliverIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            scope.pageChanged = this.pageChanged.bind(this);
                            scope.import = this.import.bind(this);
                            this.pageChanged();
                            scope.webDeliver = {};
                            scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                var resp, webDeliverContactClient, re, desc, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 7, , 8]);
                                            if (scope.webDeliver.name === undefined) {
                                                this.$swal.error({ title: "请填写Name!" });
                                                return [2 /*return*/];
                                            }
                                            if (scope.webDeliver.officePhone === undefined) {
                                                this.$swal.error({ title: "请填写Office Phone!" });
                                                return [2 /*return*/];
                                            }
                                            if (scope.webDeliver.personalPhone === undefined) {
                                                this.$swal.error({ title: "请填写Personal Phone!" });
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, this.Upload.upload({
                                                    method: "POST",
                                                    url: config_1.default.webapi + "/api/webDeliverContact/import",
                                                    data: { file: scope.file },
                                                })];
                                        case 1:
                                            resp = _a.sent();
                                            if (!(resp.status === 200)) return [3 /*break*/, 5];
                                            if (!(resp.data["errcode"] === 0)) return [3 /*break*/, 3];
                                            scope.webDeliver.iconUrl = "" + config_1.default.webapi + resp.data["data"].filePath;
                                            scope.webDeliver.filepath = resp.data["data"].filePath;
                                            webDeliverContactClient = this.api.getClient(webapi.WebDeliverContactClient);
                                            return [4 /*yield*/, webDeliverContactClient.saveDeliver(scope.webDeliver.name, scope.webDeliver.officePhone, scope.webDeliver.personalPhone, scope.webDeliver.filepath)];
                                        case 2:
                                            re = _a.sent();
                                            if (re.errcode === 0) {
                                                this.pageChanged();
                                                this.$notify.success("Update successful!");
                                                //$uibModalInstance.close();
                                            }
                                            else {
                                                this.$swal.error({ title: re.errmsg });
                                                //$uibModalInstance.close();
                                            }
                                            return [3 /*break*/, 4];
                                        case 3:
                                            desc = resp.data["errdescription"];
                                            if (desc)
                                                console.error(desc);
                                            this.$swal.warning({ title: "Failed to import contact list", text: resp.data["errmsg"] });
                                            _a.label = 4;
                                        case 4: return [3 /*break*/, 6];
                                        case 5:
                                            this.$swal.error({ title: "Import contact exception, please contact the administrator" });
                                            _a.label = 6;
                                        case 6: return [3 /*break*/, 8];
                                        case 7:
                                            err_1 = _a.sent();
                                            console.error(err_1);
                                            this.$swal.error({ title: "Update exception, please contact administrator!" });
                                            return [3 /*break*/, 8];
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [2 /*return*/];
                        });
                    });
                };
                // #region 查询分页
                DeliverIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, query_1, webDeliverContactClient, dataSource, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    query = scope.query;
                                    query.loading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    query_1 = scope.query;
                                    webDeliverContactClient = this.api.getClient(webapi.WebDeliverContactClient);
                                    return [4 /*yield*/, webDeliverContactClient.get()];
                                case 2:
                                    dataSource = _a.sent();
                                    //scope.list = dataSource.data;
                                    scope.webDeliver.name = dataSource.data.name;
                                    scope.webDeliver.officePhone = dataSource.data.officePhone;
                                    scope.webDeliver.personalPhone = dataSource.data.personalPhone;
                                    scope.webDeliver.iconUrl = "" + config_1.default.webapi + dataSource.data.imgPath;
                                    scope.webDeliver.filepath = dataSource.data.imgPath;
                                    query_1.loading = false;
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    this.$notify.error("For failure");
                                    return [3 /*break*/, 5];
                                case 4:
                                    query.loading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion 分页
                //导入头像
                DeliverIndexCtrl.prototype.import = function (file) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            query = scope.query;
                            if (!file)
                                return [2 /*return*/];
                            if (!this.validateFileSize(file, config_1.default.uploadFileMaxSize20))
                                return [2 /*return*/];
                            try {
                                scope.file = file;
                                scope.reader = new FileReader(); //
                                scope.guid = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使用
                                scope.reader.readAsDataURL(file); //FileReader的方法，把图片转成base64
                                scope.reader.onload = function (ev) {
                                    scope.$apply(function () {
                                        //scope.thumb[scope.guid] = {
                                        //    imgSrc: ev.target.result,  //接收base64
                                        //}
                                        scope.webDeliver.iconUrl = ev.target.result; //接收base64
                                    });
                                };
                            }
                            catch (err) {
                                console.error(err);
                                this.$notify.error("Import contact exception, please contact the administrator");
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                return DeliverIndexCtrl;
            }(base_1.default));
            exports_1("DeliverIndexCtrl", DeliverIndexCtrl);
        }
    };
});
//# sourceMappingURL=deliver.index.js.map